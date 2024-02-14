import { React, useState } from 'react';
import IndexContent from '../components/Index/IndexContent';
import LoginContent from '../components/Index/LoginContent';

function Index() {
  const [controllerRender, setControllerRender] = useState('login');

  let renderIndex = null;

  const renderHandle = (select) => {
    setControllerRender(select);
  };

  if (controllerRender === 'index') {
    renderIndex = <IndexContent />;
  } else if (controllerRender === 'login') {
    renderIndex = <LoginContent />;
  }

  return (
    <div className="Index">
      <div className="navFirstPage">
        <div className="indexLogo" onClick={() => renderHandle('index')}>
          PETGRAM
        </div>
        <div className="loginButton" onClick={() => renderHandle('login')}>
          LOGIN/REGISTER
        </div>
      </div>
      <div className="renderContainer">{renderIndex}</div>
    </div>
  );
}

export default Index;
