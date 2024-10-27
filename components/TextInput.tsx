interface TextInputProps {
  title: string;
  type: string;
  value: string;
  setValue: (e: any) => void;
  error?: string;
}

function TextInput(props: TextInputProps) {
  return (
    <div>
      <p>{props.title}</p>
      <input
        className="p-2 rounded-lg border border-black"
        type={props.type}
        value={props.value}
        onChange={(e) => props.setValue(e)}
      />
      <p className="text-sm text-red-500">{props?.error}</p>
    </div>
  );
}

export default TextInput;
