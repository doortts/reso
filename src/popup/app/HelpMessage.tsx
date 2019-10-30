import React from 'react';

interface Props {
    keyword?: string
}

export const HelpMessage: React.FC<Props> = props => {
    return (
        <div>Help messages here.</div>
    );
}

export default HelpMessage
