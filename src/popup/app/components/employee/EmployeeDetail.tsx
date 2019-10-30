import React from 'react';

interface Props {
  keyword?: string
}

export const EmployeeDetail: React.FC<Props> = props => {
  return (
    <div className="user-detail-twoline">
      <div className="flex-item display-name">
        <a id="connect-address" className="connect-address ng-binding" 
        href="" ng-click="vm.openAddressPage(user)" 
        target="_blank" title="shift+enter">송지은</a><span ng-repeat="server in user.servers" className="ng-scope">
          <span className="is-exist-icon es">es</span>
        </span><span ng-repeat="server in user.servers" className="ng-scope">
          <span className="is-exist-icon oss">oss</span>
        </span></div>
      <div className="user-detail flex-item ng-binding" data-name="송지은" data-oss-id="j-song0605" data-es-id="j-song0605" data-email="j.song0605@navercorp.com">FE플랫폼,
j.song0605@navercorp.com</div>
    </div>
  )
}

export default EmployeeDetail
