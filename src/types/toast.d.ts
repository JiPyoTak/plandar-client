import React from 'react';

export type TToastContent = React.ReactNode;

export type TToastId = number | string;

interface ICommonOptions {
  // 자동으로 닫히기까지 시간
  autoClose: number;
  // 클릭시 닫히기 여부
  closeOnClick?: boolean;
}

export interface IToastOptions extends ICommonOptions {
  toastId?: TToastId;
}

export type TToastContainerProps = ICommonOptions;

export interface IToastTransitionProps {
  // 활성화 여부
  isIn: boolean;
  // 닫힐 때 실행되는 콜백함수
  done: () => void;
  // ToastTransition의 자식 노드
  nodeRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}

export interface IToastProps extends IToastOptions {
  // 활성화 여부
  isIn: boolean;
  toastId: TToastId;
  key: TToastId;
  // 토스트 메시지 닫힐 때
  closeToast: () => void;
  // 토스트가 삭제될 때
  deleteToast: () => void;
  children?: TToastContent;
}

export interface INotValidatedToastProps extends Partial<IToastProps> {
  toastId: TToastId;
}

export interface IToast {
  content: TToastContent;
  props: IToastProps;
}
