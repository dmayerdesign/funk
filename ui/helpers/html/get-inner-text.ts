export function construct(_document: Document)
{
  return function(htmlString: string): string
  {
    const syntheticValueElement = _document.createElement("div")
    syntheticValueElement.innerHTML = htmlString
    return syntheticValueElement.innerText
  }
}
