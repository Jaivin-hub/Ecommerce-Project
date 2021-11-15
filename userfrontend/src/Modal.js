
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Modalcomponent = (props) => {
    const srcImg = props.srcImg
    const isModalVisible = props.isModalVisible
    const setIsModalVisible = props.setIsModalVisible
    console.log(isModalVisible)
    //save the image that used to be crop
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });



    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    {srcImg && (
                        <div>
                            <ReactCrop
                                style={{ maxWidth: "50%" }}
                                src={srcImg}
                                onImageLoaded={setImage}
                                crop={crop}
                                onChange={setCrop}
                            />
                            <Button
                            >
                                crop
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Modalcomponent;