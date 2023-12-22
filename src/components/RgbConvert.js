import { useState, useEffect } from "react";

export default function Converter() {
  const [form, setForm] = useState({ 
    hex: "", 
    rgb: "" 
});

  useEffect(() => {
    document.body.style.backgroundColor = form.rgb;
  }, [form.rgb]);

  function handleInputChange(event) {
    const { value } = event.target;
    // console.log(value)
    setForm((prevForm) => ({ ...prevForm, hex: value }));
    // console.log(prevForm)
    if (/^#[\dA-Fa-f]{6}$/.test(value)) {
      setForm((prevForm) => ({ ...prevForm, rgb: ConvertRGB(value) }));
    } else if (value.length === 7) {
      setForm((prevForm) => ({ ...prevForm, rgb: "Ошибка!" }));
    }
  }
  function ConvertRGB(hexColor) {
    const hexDigits = hexColor
    // все в нижний регистр
      .toLowerCase()
    //   Заменяем-убираем '#'
      .replace('#', '')
    // разбиваем строку в массив по знакам  
      .split('')
    //   Проходимся по элементам
      .map((item) => {
        const number = parseInt(item, 10);
        return Number.isNaN(number) ? item.codePointAt() - 87 : number;
      });
  
    const decDigits = hexDigits.reduce((acc, item, index) => {
      if (index % 2 === 0) {
        acc.push(item * 16)
      } else {
        acc[acc.length - 1] += item;
      }
  
      return acc;
    }, []);
  
    const convertedColor = `rgb(${decDigits.join(', ')})`;
  
    return convertedColor;
  }
  return (
    <form className="Converter-form" onInput={handleInputChange}>
      <input
        className="Converter-input"
        type="text"
        name="hex"
        maxLength="7"
        autoComplete="off"
        autoFocus
        defaultValue={form.hex}
      />
      <output
        className="Converter-output"
        type="text"
        name="rgb"
        style={{ backgroundColor: form.rgb }}
      >
        <span className="Converter-output-text" style={{ color: form.rgb }}>
          {form.rgb}
        </span>
      </output>
    </form>
  );
}