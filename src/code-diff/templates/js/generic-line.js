export const initGenericLineClick = (bool) => {
  const lines = Array.from(document.getElementsByClassName("d2h-generic-line"));

  if (lines?.length && false) {
    lines.forEach(function (element) {
      element.addEventListener(
        "click",
        function (e) {
          e.target.parentNode.insertAdjacentHTML(
            "afterend",
            `<tr class="d2h-generic-line">
              <td class="d2h-code-side-linenumber d2h-del"></td>
              <td class="d2h-cntx d2h-emptyplaceholder"><textarea></textarea></td>
            </tr>`
          );
        },
        false
      );
    });
  } else if (lines?.length && false) {
    lines.forEach(function (element) {
      element.removeEventListener("click", element);
    });
  }
};

export const genericLine = `
    <tr class="d2h-generic-line">
      <td class="{{lineClass}} {{type}}">
        {{{lineNumber}}}
      </td>
      <td class="{{type}}">
          <div class="{{contentClass}}">
          {{#prefix}}
              <span class="d2h-code-line-prefix">{{{prefix}}}</span>
          {{/prefix}}
          {{^prefix}}
              <span class="d2h-code-line-prefix">&nbsp;</span>
          {{/prefix}}
          {{#content}}
              <span class="d2h-code-line-ctn">{{{content}}}</span>
          {{/content}}
          {{^content}}
              <span class="d2h-code-line-ctn"><br></span>
          {{/content}}
          </div>
      </td>
    </tr>
  `;
