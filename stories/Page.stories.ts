import { createPage } from '../src/page/Page';
import * as HeaderStories from './Header.stories';
import { withScreenshot } from 'storycap';

export default {
  title: 'Example/Page',
  decorators: [withScreenshot],
  argTypes: {
    onLogin: { action: 'onLogin' },
    onLogout: { action: 'onLogout' },
    onCreateAccount: { action: 'onCreateAccount' },
  },
  parameters: {
    screenshot: {
      skip: false,
      viewports: {
        mobile: {
          width: 480,
          height: 720
        },
        laptop: {
          width: 601,
          height: 720
        },
        desktop: {
          width: 1281,
          height: 720
        }
      }
    }
  }
};

const Template = (args : any) => createPage(args);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
