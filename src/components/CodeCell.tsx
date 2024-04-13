import { useEffect } from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

import { Cell } from '../state';

import checkInnerWidth from '../hooks/helpers/checkInnerWidth';

interface CodeCellProps {
    projId: string;
    cell: Cell;
};

const CodeCell: React.FC<CodeCellProps> = ({ projId, cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles[cell.id]);
    const initialValue = useTypedSelector(({ userProjects: { projects } }) => {
        return projects[projId].data[cell.id]?.content;
    })
    const cumulativeCode = useCumulativeCode(projId, cell.id);

    useEffect(() => {
        if (!bundle) {
            createBundle(cell.id, cumulativeCode)
            return;
        }

        const timer = setTimeout(() => {
            createBundle(cell.id, cumulativeCode)
        }, 750);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cell.id, cumulativeCode, createBundle])

    return (
        <div className="CodeCell">
            {
                checkInnerWidth(768) ?
                    <Resizable direction='vertical'>
                        <div style={{ height: "calc(100% - 10px)", display: "flex" }}>
                            <Resizable direction='horizontal'>
                                <CodeEditor
                                    initialValue={initialValue}
                                    onChange={(value) => updateCell(projId, cell.id, value)}
                                />
                            </Resizable>
                            <div className="progress-wrapper">
                                {
                                    !bundle || bundle.loading ?
                                        <div className='progress-cover'>
                                            <progress className="progress is-small is-primary" max="100">Loading</progress>
                                        </div>
                                        : <Preview code={bundle.code} error={bundle.err} />
                                }
                            </div>
                        </div>
                    </Resizable>
                    :
                    <>
                        <Resizable direction='vertical'>
                            <CodeEditor
                                initialValue={initialValue}
                                onChange={(value) => updateCell(projId, cell.id, value)}
                            />
                        </Resizable>
                        <Resizable direction='vertical'>
                            <div className="progress-wrapper">
                                {
                                    !bundle || bundle.loading ?
                                        <div className='progress-cover'>
                                            <progress className="progress is-small is-primary" max="100">Loading</progress>
                                        </div>
                                        : <Preview code={bundle.code} error={bundle.err} />
                                }
                            </div>
                        </Resizable>
                    </>
            }

        </div>
    )
}

export default CodeCell;