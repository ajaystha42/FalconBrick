import { marked } from "marked";
import { useEffect, useRef, useState } from "react";

function App() {
  const [md, setMd] = useState(`## A\n1. a\n1. e\n1. i\n*A*\n **A**\n_A_`);
  const [toggle, setToggle] = useState(false);
  const [preview, setPreview] = useState(md);

  const ref = useRef(null);

  useEffect(() => {
    const html = marked.parse(md);
    setPreview(html);
  }, [md]);

  const apply = (action) => {
    const textarea = ref.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const sub = md.substring(start, end);

    const startText = md.substring(0, start);
    const endText = md.substring(end, md.length);

    console.log({
      startText,
      sub,
      endText,
    });

    let temp;

    switch (action) {
      case "bold":
        temp = `${startText}__${sub}__${endText}`;
        break;
      case "italic":
        temp = `${startText}*${sub}*${endText}`;
        break;
      case "strikethrough":
        temp = `${startText}~~${sub}~~${endText}`;
        break;
      case "underline":
        temp = `${startText}<u>${sub}</u>${endText}`;
        break;

      case "H4":
        temp = `${startText}#### ${sub}${endText}`;
        break;
      case "H2":
        temp = `${startText}## ${sub}${endText}`;
        break;
      case "H1":
        temp = `${startText}# ${sub}${endText}`;
        break;

      case "quote":
        temp = `${startText}>${sub}${endText}`;
        break;

      case "uppercase":
        temp = `${startText}${sub.toUpperCase()}${endText}`;
        break;

      case "lowercase":
        temp = `${startText}${sub.toLowerCase()}${endText}`;
        break;

      default:
        break;
    }

    setMd(temp);
  };

  return (
    <div className="App">
      <button onClick={() => setToggle(!toggle)}>Preview</button>

      <button>H</button>

      <button onClick={() => apply("bold")}>B</button>
      <button onClick={() => apply("italic")}>I</button>
      <button onClick={() => apply("underline")}>U</button>
      <button onClick={() => apply("strikethrough")}>
        <strike>S</strike>
      </button>

      <button onClick={() => apply("H1")}>H1</button>
      <button onClick={() => apply("H2")}>H2</button>
      <button onClick={() => apply("H4")}>H4</button>
      <button onClick={() => apply("quote")}>""</button>
      <button onClick={() => apply("uppercase")}>uppercase</button>
      <button onClick={() => apply("lowercase")}>lowercase</button>

      <br />

      {toggle && (
        <textarea
          ref={ref}
          onChange={(e) => setMd(e.target.value)}
          value={md}
          rows={10}
        />
      )}

      {!toggle && <div dangerouslySetInnerHTML={{ __html: preview }} />}
    </div>
  );
}

export default App;
