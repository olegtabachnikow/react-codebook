import { FC, Fragment, useEffect } from 'react';
import './CellList.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import CellListItem from '../CellListItem/CellListItem';
import AddCell from '../AddCell/AddCell';
import { fetchCells, saveCells } from '../../state/cells-slice/cells-slice';

const CellList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, order } = useSelector((state: RootState) => state.cells);
  const cellList = order.map((id) => data[id]);
  const jsonCellList = JSON.stringify(cellList);

  useEffect(() => {
    dispatch(fetchCells());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(saveCells()), 250);
    return () => clearTimeout(timer);
  }, [jsonCellList]);

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cellList.length === 0} previousCellId={null} />
      {cellList.map((el) => (
        <Fragment key={el.id}>
          <CellListItem item={el} />
          <AddCell previousCellId={el.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
