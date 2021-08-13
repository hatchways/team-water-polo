import { useState, SyntheticEvent } from 'react';
import axios from 'axios';

export default function ImageForm(): JSX.Element {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [images, setImages] = useState<Array<string>>([]);

  async function submitForm(e: SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', file);
    const result = await axios.post('/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  }

  function handleChange(e: SyntheticEvent) {
    const element = e.currentTarget as HTMLInputElement;
    setText(element.value);
  }

  const fileSelected = (event: SyntheticEvent) => {
    const file = (event.target as HTMLInputElement).files[0];
    setFile(file);
  };

  return (
    <div>
      <form action="">
        <input onChange={handleChange} type="text" name="text" value={text} />
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button onClick={submitForm}>submit</button>
      </form>
      <img src={`https://water-polo-hatchways.s3.ca-central-1.amazonaws.com/5a7cd3c023db2417a00f78e54e27f566`} alt="" />
    </div>
  );
}
