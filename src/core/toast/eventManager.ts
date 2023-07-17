import { TToastContent, INotValidatedToastProps } from '@/types/toast';

type TEvent = 'show' | 'willUnmount';

type TOnShowCallback = (
  content: TToastContent,
  options: INotValidatedToastProps,
) => void;
type TOnWillUnmountCallback = () => void;

type TCallback = TOnShowCallback | TOnWillUnmountCallback;

class EventManager {
  list: Map<TEvent, TCallback[]> = new Map();

  on(event: 'show', callback: TOnShowCallback): EventManager;
  on(event: 'willUnmount', callback: TOnWillUnmountCallback): EventManager;
  on(event: TEvent, callback: TCallback): EventManager {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event)!.push(callback);
    return this;
  }

  off(event: TEvent, callback?: TCallback): EventManager {
    if (callback) {
      const cb = this.list.get(event)!.filter((cb) => cb !== callback);
      this.list.set(event, cb);
      return this;
    }
    this.list.delete(event);
    return this;
  }

  emit(
    event: 'show',
    content: TToastContent,
    options: INotValidatedToastProps,
  ): void;
  emit(event: 'willUnmount'): void;
  emit(event: TEvent, ...args: any[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback: TCallback) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        callback(...args);
      });
  }
}

const eventManager = new EventManager();

export { eventManager };
