import { action, computed, makeObservable, observable } from 'mobx';

import RootStore from 'store/RootStore';

export type BannerFormType = {
  height: number;
  width: number;

  img: string | null;
  imgWidth: number;
  imgHeight: number;
  background: string;

  text: string;

  textColor: string;

  textFont: number;
};

export enum BannerFormEnum {
  height = 'height',
  width = 'width',
  img = 'img',
  imgHeight = 'imgHeight',
  imgWidth = 'imgWidth',
  background = 'background',
  text = 'text',
  textColor = 'textColor',
  textFont = 'textFont',
}

export class BannerStore {
  initialValues: BannerFormType = {
    height: 450,
    width: 340,

    img: null,
    imgHeight: 50,
    imgWidth: 50,

    text: 'Некоторый текст',
    textColor: '#000000',
    background: '#ffffff',
    textFont: 14,
  };

  @observable private formValues: BannerFormType = {} as BannerFormType;

  rootStore: RootStore | null = null;

  constructor(root: RootStore) {
    this.rootStore = root;
    this.setInitialValues();
    makeObservable(this);
  }

  @computed
  get values(): BannerFormType {
    return this.formValues;
  }

  @action.bound
  setValues(newValues: BannerFormType): void {
    this.formValues = { ...newValues };
  }

  @action.bound
  setInitialValues(): void {
    this.formValues = { ...this.initialValues };
  }

  @action.bound
  toJSON(): string {
    return JSON.stringify(this.values);
  }
}
