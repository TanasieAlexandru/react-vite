import { atom, useAtom } from 'jotai';

// Create your atoms and derivatives
const textAtom = atom('hello');
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase());

// Use them anywhere in your app
const Input = () => {
	const [text, setText] = useAtom(textAtom);
	const handleChange = (e) => setText(e.target.value);
	return <input value={text} onChange={handleChange} />;
};

const Uppercase = () => {
	const [uppercase] = useAtom(uppercaseAtom);
	return <div>Uppercase: {uppercase}</div>;
};

// Now you have the components
export default function Jotai() {
	return (
		<>
			<Input />
			<Uppercase />
		</>
	);
}
