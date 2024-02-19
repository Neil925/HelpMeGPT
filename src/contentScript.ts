let highlight = false;
let highlighted: HTMLElement[] = [];

setInterval(async () => {
    highlight = ((await browser.storage.local.get("HelpMeData")).HelpMeData as HelpMeData).selectMode;
    console.log(highlight);
}, 1000);

function handleMouseOver(ev: MouseEvent) {
    if (!highlight || !(ev.target instanceof HTMLElement))
        return;

    highlighted.push(ev.target);

    ev.target.style.textDecoration = "3px yellow underline";
}

function handleMouseLeave(ev: MouseEvent) {
    if (!highlight || !(ev.target instanceof HTMLElement) || !highlighted.includes(ev.target))
        return;

    ev.target.style.textDecoration = "unset";
    // highlighted. remove
}

document.addEventListener("mouseover", handleMouseOver);
document.addEventListener("mouseleave", handleMouseLeave);

console.log("Event listener added.");