import Config from '../../config/app.config';
import { ErrorHandler } from '../plugins/error';
import * as StringPlugin from '../plugins/string';

export const SetGlobal = () => {
    global.Config = Config;
    global.ErrorHandler = ErrorHandler;
    global.StringPlugin = StringPlugin;
};