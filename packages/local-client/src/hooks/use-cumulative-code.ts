import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../state/store';
import { Cell } from '../types/types';
import { useSelector } from 'react-redux';

export const useCumulativeCode = (cellId: string) => {
  const data = (state: RootState) => state.cells.data;
  const order = (state: RootState) => state.cells.order;

  const showFunction = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';
  
  var show = (value) => {
    if (typeof value === 'object') {
      if (value.$$typeof && value.props) {
        _ReactDOM.render(value, root);
      } else {
        root.innerHTML = JSON.stringify(value);
      }
    } else {
      root.innerHTML = value;
    }
  };
  `;
  const showFunctionNoOperation = 'var show = () => {}';

  const cumulativeCode = createSelector(
    [data, order],
    (dataArr: { [key: string]: Cell }, orderArr: string[]) => {
      const orderedCells = orderArr.map((id: string) => dataArr[id]);
      const cumulativeCode = [];
      for (const c of orderedCells) {
        if (c.type === 'code') {
          if (c.id === cellId) {
            cumulativeCode.push(showFunction);
          } else {
            cumulativeCode.push(showFunctionNoOperation);
          }
          cumulativeCode.push(c.content);
        }
        if (c.id === cellId) {
          break;
        }
      }
      return cumulativeCode;
    }
  );
  return useSelector(cumulativeCode).join('\n');
};
