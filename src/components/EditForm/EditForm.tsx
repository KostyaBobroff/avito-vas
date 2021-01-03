import * as React from 'react';
import cn from 'classnames';
import { Input, Form, Upload, Button } from 'antd';
import { observer } from 'mobx-react';
import { useFormik } from 'formik';
import { UploadOutlined } from '@ant-design/icons';

import { useBannerStore } from 'store/context';
import { toBase64 } from 'utils/toBase64';
import { BannerFormEnum, BannerFormType } from 'store/bannerStore';

import styles from './EditForm.modules.scss';

interface Props {
  className?: string;
}

const EditForm: React.FC<Props> = ({ className }: Props) => {
  const bannerStore = useBannerStore();
  const formik = useFormik<BannerFormType>({
    initialValues: bannerStore.initialValues,
    onSubmit: () => undefined,
  });

  React.useEffect(() => {
    bannerStore.setValues(formik.values);
  }, [formik.values]);

  return (
    <div className={cn(styles.editor, className)}>
      <Form.Item label="Ширина Баннера">
        <Input
          placeholder="ширина"
          type="number"
          min={0}
          name={BannerFormEnum.width}
          onChange={formik.handleChange}
          value={formik.values.width}
        />
      </Form.Item>
      <Form.Item label="Высота Баннера">
        <Input
          placeholder="высота"
          type="number"
          min={0}
          name={BannerFormEnum.height}
          onChange={formik.handleChange}
          value={formik.values.height}
        />
      </Form.Item>
      <Form.Item label="Картинка">
        <Upload
          multiple={false}
          onChange={async ({ file: { originFileObj } }) => {
            formik.setValues({
              ...formik.values,
              [BannerFormEnum.img]: (await toBase64(
                originFileObj as File
              )) as string,
            });
          }}
          onRemove={() => {
            formik.setValues({
              ...formik.values,
              [BannerFormEnum.img]: null,
            });
          }}
          name={BannerFormEnum.img}
        >
          <Button icon={<UploadOutlined />}>Загрузите картинку</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Ширина Баннера">
        <Input
          placeholder="ширина"
          type="number"
          min={0}
          name={BannerFormEnum.imgWidth}
          onChange={formik.handleChange}
          value={formik.values.imgWidth}
        />
      </Form.Item>
      <Form.Item label="Высота картинки">
        <Input
          placeholder="высота"
          type="number"
          min={0}
          name={BannerFormEnum.imgHeight}
          onChange={formik.handleChange}
          value={formik.values.imgHeight}
        />
      </Form.Item>
      <Form.Item label="Цвет Баннера">
        <Input
          type="color"
          value={formik.values.background}
          onChange={formik.handleChange}
          name={BannerFormEnum.background}
        />
      </Form.Item>
      <Form.Item label="Текст">
        <Input.TextArea
          placeholder="текст"
          value={formik.values.text}
          onChange={formik.handleChange}
          name={BannerFormEnum.text}
        />
      </Form.Item>
      <Form.Item label="Размер текста">
        <Input
          type="number"
          placeholder="размер"
          min={0}
          value={formik.values.textFont}
          onChange={formik.handleChange}
          name={BannerFormEnum.textFont}
        />
      </Form.Item>
      <Form.Item label="Цвет текста">
        <Input
          type="color"
          placeholder="картинка"
          value={formik.values.textColor}
          onChange={formik.handleChange}
          name={BannerFormEnum.textColor}
        />
      </Form.Item>
    </div>
  );
};

export default observer(EditForm);
