import * as react from 'react';
import { Navigate, Params, useLocation, useParams } from 'react-router';
export function ConditionalRedirect(properties: { children: any, validatePath(pathname: string, params: Readonly<Params<string>>): boolean, to: string }) {
    const { pathname } = useLocation();
    const params = useParams();

    const isValid = react.useCallback(() => properties.validatePath(pathname, params), [pathname, params])
    if (isValid()) {
        return properties.children
    }
    return <Navigate replace to={properties.to} />
}