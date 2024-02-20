const className = "help-highlight";
let highlight = false;
let highlighted: HTMLElement[] = [];

browser.storage.local.onChanged.addListener(ev => {
    let update = ev?.HelpMeData?.newValue?.selectMode;

    if (update === undefined || highlight === update)
        return;

    highlight = update;

    for (let el of highlighted)
        el.classList.remove(className);

    highlighted = [];
});

var style = document.createElement('style');
style.innerHTML = `.${className} { background-color: #ffffa5 !important; border: 3px solid #919100 !important; color: black !important }`;
document.getElementsByTagName('head')[0].appendChild(style);

function add(el: HTMLElement) {
    el.classList.add(className);
    highlighted.push(el);
}

function remove(el: HTMLElement) {
    el.classList.remove(className);
    highlighted.splice(highlighted.indexOf(el));
}

function handleMouseOver(ev: MouseEvent) {
    if (!highlight || !(ev.target instanceof HTMLElement))
        return;

    highlighted.push(ev.target);

    add(ev.target);
}

function handleMouseOut(ev: MouseEvent) {
    if (!highlight || !(ev.target instanceof HTMLElement) || !highlighted.includes(ev.target))
        return;

    remove(ev.target);
}

async function handleClick(this: Document, ev: MouseEvent) {
    if (!highlight || !(ev.target instanceof HTMLElement) || !highlighted.includes(ev.target))
        return;
    
    ev.preventDefault();

    let helpMeData = (await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData;
    helpMeData.selectMode = false;
    
    helpMeData.selections.push(ev.target.innerText);

    await browser.storage.local.remove("HelpMeData");
    await browser.storage.local.set({ HelpMeData: helpMeData });
}

document.addEventListener("mouseover", handleMouseOver);
document.addEventListener("mouseout", handleMouseOut);
document.addEventListener("click", handleClick);