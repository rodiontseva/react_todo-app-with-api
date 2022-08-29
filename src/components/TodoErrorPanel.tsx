/* eslint-disable jsx-a11y/control-has-associated-label */
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

interface Props {
  errorMessages: string [],
  setErrorMessages: (errorMessage: string []) => void,
}

export const TodoErrorPanel: FC<Props> = (props) => {
  const { errorMessages, setErrorMessages } = props;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorMessages([]);
    }, 3000);

    return (
      () => {
        clearTimeout(timerId);
      }
    );
  }, [setErrorMessages]);

  const newErrorMessages = errorMessages.map(message => (
    {
      id: uuidv4(),
      body: message,
    }
  ));

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessages.length },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessages([])}
      />
      {newErrorMessages.map(message => (
        <React.Fragment key={message.id}>
          {message.body}
          <br />
        </React.Fragment>
      ))}

      {/* Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
      <br />
      {'Title can\'t be empty'} */}
    </div>
  );
};