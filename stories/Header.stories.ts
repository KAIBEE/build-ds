import { createHeader } from '../src/header/Header';
import { withScreenshot } from 'storycap';

export default {
  title: 'Example/Header',
  decorators: [withScreenshot],
  argTypes: {
    onLogin: { action: 'onLogin' },
    onLogout: { action: 'onLogout' },
    onCreateAccount: { action: 'onCreateAccount' },
  },
  parameters: {
    screenshot: {
      skip: false
    }
  }
};

const Template = (args : any) => createHeader(args);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
