import React, { Context } from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import { Default as FeedBacky } from '../stories/FeedBacky.stories';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FeedBacky', () => {
  it('it should render feedbacky component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FeedBacky />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('it should not render feedbacky component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<></>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('FeedBacky and Opening Modal', () => {
  const url = 'http://test-url.com';
  const onComplete = jest.fn();
  const data = {};

  it('it should render feedbacky component and Open Modal', async () => {
    render(<FeedBacky />);
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    await waitFor(() => {
      const text = screen.getByText(/Send Your FeedBack/i);
      expect(text).not.toBeNull();
    });
  });

  it('it should render feedbacky component and Open Modal and Close Modal', async () => {
    render(<FeedBacky />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    await act(async () => {
      const closeIcon = screen.getByTestId('closeIcon');
      fireEvent.click(closeIcon);
    });
    let domInfo;
    await waitFor(() => (domInfo = screen.queryByTestId('closeIcon')));
    expect(domInfo).toBeNull();
  });

  it('it should render feedbacky component and Open Modal and Textarea', async () => {
    render(<FeedBacky />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    await waitFor(async () => {
      let input: HTMLTextAreaElement = screen.getByLabelText('textarea-input');
      fireEvent.change(input, {
        target: { value: 'asd' },
      });
      expect(input.value).toBe('asd');
    });
  });

  it('it should render feedbacky component and Open Modal and Show Error text output if textarea text field is more than 2000 characters ', async () => {
    render(<FeedBacky />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    await waitFor(async () => {
      let input: HTMLTextAreaElement = screen.getByLabelText('textarea-input');
      fireEvent.change(input, {
        target: {
          value:
            'adsasdsadasdasdasdasdadsasdsadasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdasdadasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasdadsasdsadasdasdasdasd',
        },
      });
      const errorText = screen.getByText(/2000 karakterden fazla olamaz!/i);
      expect(errorText).not.toBeNull();
    });
  });

  it('it should render feedbacky component and Open Modal and Hidden Error text output if textarea text field is less than 2000 characters ', async () => {
    render(<FeedBacky />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    await waitFor(async () => {
      let input: HTMLTextAreaElement = screen.getByLabelText('textarea-input');
      fireEvent.change(input, {
        target: {
          value: 'asdasdasd',
        },
      });
      const errorText = screen.queryByTestId('error-test');
      expect(errorText).toBeNull();
    });
  });

  it('it should render feedbacky component and Open Modal and Successfully POST FeedBack', async () => {
    render(<FeedBacky />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const sendButton: HTMLButtonElement = screen.getByTestId('sendButton');
      const datas: object = {
        domain: 'trendyol.com',
        feedback: 'asdasjkldajs',
      };
      const mockedResponse: AxiosResponse = {
        data: datas,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
      mockedAxios.post.mockResolvedValue(mockedResponse);
      fireEvent.click(sendButton);
    });

    await waitFor(() => {
      const text = screen.getByText(/WE HAVE GOT YOUR FEEDBACK/i);
      expect(text).not.toBeNull();
    });
  });
});
