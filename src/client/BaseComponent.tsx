
import React from "react";
import { useGetCurrentUserQuery } from "./gql/operations.generated";

export function BaseComponent() {
    
    const { loading, error, data } = useGetCurrentUserQuery();

    if (loading) {
        return (<div>Loading...</div>);
    }

    if (error || !data) {
        return (<div>Error : {!error ? 'No data found' : error.message}</div>);
    }
    
    return (<div>This is base BaseComponent {data.currentUser.name}</div>);
}
