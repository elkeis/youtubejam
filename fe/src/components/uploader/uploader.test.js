import Uploader from './index';
import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Uploader', () => {

    let controls;

    beforeEach(() => {
        controls = {
            getFileLink: () => screen.getByTestId('choose-file-link'),
            getFileInput: () => screen.getByTestId('file-input'),
            getUploadButton: () => screen.getByTestId('upload-button'),
        }
    });


    it('should render upload controls in initial state', () => {
        render(<Uploader/>);
        expect(controls.getFileLink()).toBeInTheDocument();
        expect(controls.getUploadButton()).toBeInTheDocument();
        expect(controls.getUploadButton()).toBeDisabled();
        cleanup();
    });

    describe('When file choosen ', () => {
        let onUploadStart;
        let file;
        beforeEach(() => {
            onUploadStart = jest.fn();
            file = new File([], 'TestFile.mp4');
            render(<Uploader
                onUploadStart={onUploadStart} 
                file={file}
            />);
            userEvent.upload(controls.getFileLink(), file);
        });

        it('should display file name ', () => {
            expect(controls.getFileLink().textContent).toEqual('TestFile.mp4');
        });

        it('should enable upload button', () => {
            expect(controls.getUploadButton()).not.toBeDisabled();
        });

        describe('When click upload button', () => {

            beforeEach(() => {
                controls.getUploadButton().click();
            });

            it('should call onUploadStart handler', () => {
               expect(onUploadStart).toHaveBeenCalledWith(file);
            });
            
        });
    })

    describe('When disabled', () => {
        beforeEach(() => {
            render(<Uploader
                disabled={true}
            />);
        });

        it('should disable all controls', () => {
            expect(controls.getUploadButton()).toBeDisabled();
            expect(controls.getFileInput()).toBeDisabled();
        });
    });
});