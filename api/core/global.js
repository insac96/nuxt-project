import Config from '../../config/api.config';
import { ErrorHandler } from '../plugins/error';
import * as StringPlugin from '../plugins/string';

export const SetGlobal = () => {
    global.Config = Config;
    global.ErrorHandler = ErrorHandler;
    global.StringPlugin = StringPlugin;
};