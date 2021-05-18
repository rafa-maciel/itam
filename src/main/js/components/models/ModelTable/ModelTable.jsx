import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { ModelDeleteDialog, ModelUpdateDialog } from '..'

export default function ModelTable({ models, onUpdateItemList }) {
    const [ selectedModel, setSelectedModel ] = useState([])
    const [ showUpdateDialog, setShowUpdateDialog ] = useState(false)
    const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)
    
    const tableHeaders = ['Model', 'Brand', 'Actions']

    return (
        <>
            <Table size="small" aria-label="Model Table" className="model-table">
                <ModelTableHeader headers={ tableHeaders }></ModelTableHeader>

                <TableBody>
                    { models.map((model, index) => (
                        <ModelTableRow
                            model={ model }
                            key={ index }
                            onUpdateCall={ model => {
                                setSelectedModel(model)
                                setShowUpdateDialog(true)
                            }}
                            onDeleteCall={ model => {
                                setSelectedModel(model)
                                setShowDeleteDialog(true)
                            }}>

                        </ModelTableRow>
                    ))}
                </TableBody>
            </Table>

            <ModelUpdateDialog 
                showDialog={ showUpdateDialog }
                model={ selectedModel }
                onClose={ () => { setShowUpdateDialog(false) }}
                onUpdate={() => {
                    setShowUpdateDialog(false)
                    onUpdateItemList()
                }}
                uri={ selectedModel && selectedModel._links ? selectedModel._links.self.href : null}
                />

            <ModelDeleteDialog
                showDialog={ showDeleteDialog }
                model={ selectedModel.model }
                brand={ selectedModel.brand }
                onClose={ () => { setShowDeleteDialog(false )}}
                onDelete={ () => {
                    setShowDeleteDialog(false)
                    onUpdateItemList()
                }}
                uri={ selectedModel && selectedModel._links ? selectedModel._links.self.href : null} 
                />
        </>
    )
}

function ModelTableHeader({ headers }) {
    return (
        <TableHead>
            <TableRow>
                { headers.map((title, index) => (
                    <TableCell key={ index }>{ title }</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

function ModelTableRow({ model, onUpdateCall, onDeleteCall }) {
    return (
        <TableRow>
            <TableCell>{ model.model }</TableCell>
            <TableCell>{ model.brand }</TableCell>
            <TableCell>
                <Button 
                    type="button" 
                    onClick={ () => onUpdateCall(model)}>
                        Update
                </Button>
                |
                <Button 
                    type="button" 
                    onClick={ () => onDeleteCall(model)}>
                        Remove
                </Button>
            </TableCell>
        </TableRow>
    )
}