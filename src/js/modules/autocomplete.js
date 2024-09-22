import autoComplete from "@tarekraafat/autocomplete.js";
import countryList from "./country-list.js";

function autoCompleteFun() {
    const autoCompleteJS = new autoComplete({
        selector: "#autoCompleteDiscover",
        placeHolder: "e.g Bali, Indonesia",
        data: {
            src: countryList,
        },
        resultItem: {
            highlight: true,
        },
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autoCompleteJS.input.value = selection;
                }
            }
        }
        
    });

}

export default autoCompleteFun;