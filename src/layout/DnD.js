import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from "immutability-helper";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLongPress } from "use-long-press";

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

	const [canDrag, setCanDrag] = useState(false);

	const longPress = useLongPress(
		() => {
			setCanDrag(true);
		},
		{
			onFinish: () => setCanDrag(false),
			threshold: 500,
		}
	);

	let [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: () => {
			if (canDrag) return { id, index }

		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	drag(drop(ref));

	return (
		<div {...longPress()} className='set'><ComponentCard cardRef={ref} styleCard={styleCard} isDragging={isDragging || canDrag} handlerId={handlerId}
			id={id} card={card} /></div>
	)

}

const Container = (props) => {
	const array = props.array
	array.sort((a, b) => parseInt(a.order) - parseInt(b.order));
	const [cards, setCards] = useState(array);

	useEffect(() => {
		setCards(array);
	}, [array])

	useEffect(() => {
		let cardDict = {};
		let order = 0;
		cards.forEach(card => {
			cardDict[card.exerciseId] = order++;
		});

		props.update(cardDict);
	}, [cards, props])

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
				key={card.exerciseId}
				index={index}
				id={card.exerciseId}
				moveCard={moveCard}
				ComponentCard={props.component}
				card={card}
			/>
		);
	}, [moveCard, props.component]);
	return (
		<>
			<div>{cards.map((card, i) => renderCard(card, i))}</div>
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
			<Container array={props.array} component={props.component} update={props.update} />
		</DndProvider>
	)
}

export default DnD;
