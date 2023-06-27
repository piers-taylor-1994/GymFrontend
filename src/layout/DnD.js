import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from "immutability-helper";
import { useCallback, useEffect, useRef, useState } from "react";

export const Card = ({ id, index, moveCard, ComponentCard, update, card }) => {
	const ref = useRef(null);

	const ItemTypes = { 
		CARD: 'card',
	}
	
	const styleCard = {
		cursor: 'move'
	}

	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			}
			
		},
		drop(item, monitor) {
			update();
		},
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = index
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex)
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: () => {
			return { id, index }
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	drag(drop(ref));

	return (
		<ComponentCard cardRef={ref} styleCard={styleCard} isDragging={isDragging} handlerId={handlerId} 
		id={id} card={card}/>
	)

}

const Container = (props) => {
	const array = props.array
	array.sort((a, b) => parseInt(a.order) - parseInt(b.order));
	const [cards, setCards] = useState(array);
	
	useEffect(()=>{
		setCards(array);
	},[array])

	const UpdateOrders = useCallback(() => {
		let cardDict = {};
		let order = 0;
		cards.forEach(card => {
			cardDict[card.id] = order++;
		});

		props.update(cardDict);
	}, [cards, props]);

	const moveCard = useCallback((dragIndex, hoverIndex) => {
		setCards((prevCards) =>
			update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex]]
				]
			})
		);
	}, []);

	const renderCard = useCallback((card, index) => {
		return (
			<Card
				key={card.id}
				index={index}
				id={card.id}
				moveCard={moveCard}
				ComponentCard={props.component}
				update={UpdateOrders}
				card={card}
			/>
		);
	}, [moveCard, UpdateOrders, props.component]);
	return (
		<>
			<div className={props.class}>{cards.map((card, i) => renderCard(card, i))}</div>
		</>
	);
};

let backend = TouchBackend;

if (window.matchMedia("(pointer: fine)").matches) {
	// desktop
	backend = HTML5Backend;
}

function DnD(props) {
	return (
		<DndProvider backend={backend}>
			<Container array={props.array} component={props.component} update={props.update} class={props.class}/>
		</DndProvider>
	)
}

export default DnD;
