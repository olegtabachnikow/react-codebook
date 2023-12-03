import { FC, useEffect } from 'react';
import './CodeCell.css';
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import Resizable from '../Resizable/Resizable';
import { Cell } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateCell } from '../../state/cells-slice/cells-slice';
import { createBundle } from '../../state/bundle-slice/bundle-slice';
import { AppDispatch, RootState } from '../../state/store';
import Loader from '../Loader/Loader';
import { useCumulativeCode } from '../../hooks/use-cumulative-code';

interface Props {
  cell: Cell;
}

export const CodeCell: FC<Props> = ({ cell }) => {
  const { id, content } = cell;
  const dispatch = useDispatch<AppDispatch>();

  const bundle = useSelector((state: RootState) => state.bundles[cell.id]);
  const code = useCumulativeCode(cell.id);

  const handleCreateBundle = (code: string, cellId: string) => {
    dispatch(createBundle({ cellId, code }));
  };

  useEffect(() => {
    if (!bundle) {
      handleCreateBundle(code, id);
      return;
    }

    const timeout = setTimeout(async () => {
      handleCreateBundle(code, id);
    }, 750);
    return () => clearTimeout(timeout);
  }, [code, id, bundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 11px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            onChange={(value: string) =>
              dispatch(updateCell({ id: id, content: value }))
            }
            input={content}
          />
        </Resizable>
        <div className='result-wrapper'>
          {!bundle || bundle.loading === true ? (
            <div className='loader-cover'>
              <Loader />
            </div>
          ) : (
            <Preview code={bundle.code} bundleErr={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
