import { interval, take } from "rxjs";

export const removeSidebar = () : HTMLDivElement => {
  const element = document.querySelector('#sidebar') as HTMLDivElement;
  const overlayElement = document.querySelector('.sidebar-overlay') as HTMLDivElement;
  const numbers = interval(50);
  const takeFiveNumbers = numbers.pipe(take(5));
  takeFiveNumbers.subscribe(x => {
    overlayElement.style.backgroundColor = `rgba(0, 0, 0, 0.${4 - x})`;
  });
  element?.classList?.remove('animate__fadeInLeft');
  element?.classList?.add('animate__fadeOutLeft');
  return element;
}