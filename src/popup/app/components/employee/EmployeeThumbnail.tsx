
import React from 'react';

interface Props {
    keyword?: string
}

export const EmployeeThumbnail: React.FC<Props> = props => {
    return (
        <div className="flex-item flex-avatar">
        <a id="connect-address" href=""
            target="_blank"
            title="shift+enter">
            <i className="user-avatar material-icons">
                <img ng-src="https://photoemp.navercorp.com/empPhoto/thumbnail/A1701090209729.jpg"
                    className="user-photo ng-scope"
                    ng-if="user.photoUrl"
                    src="https://photoemp.navercorp.com/empPhoto/thumbnail/A1701090209729.jpg" />
                <img className="family-name user-photo-default no-photo ng-hide"
                    ng-show="!user.photoUrl"
                    src="/views/images/default-avatar-64.png" />
            </i>
        </a>
    </div>

    )
}

export default EmployeeThumbnail
