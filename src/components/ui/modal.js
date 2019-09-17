import React from 'react';

import classes from './modal.module.scss';

const modal = props => {
  // shouldComponentUpdate ( nextProps, nextState ) {
  //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }
  
  const style = {
      display: props.show ? 'flex' : 'none'
  }

  return (
        <div className={classes.overlay} style={style}>
            <div className={classes.backdrop} onClick={props.modalClosed} />
            <div
                className={classes.modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                >
                {props.children}
            </div>
        </div>
    )
}

export default React.memo(
    modal,
    (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);