export interface IUseIntersectionObserver extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export type IRef = React.RefObject<Element>;

export type IIntersectionObserverReturn = {
  isIntersecting: IntersectionObserverEntry["isIntersecting"];
  elemRef?: IRef;
};
