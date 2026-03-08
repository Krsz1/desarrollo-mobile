const myArray = ["First App", "Second App", "Third App"];

function Arrays() {
  return (
    <>
      <ol>
        {myArray.map((item, index) => (
          <li key={index}> {item} </li>
        ))}
      </ol>
    </>
  );
}

export default Arrays;
