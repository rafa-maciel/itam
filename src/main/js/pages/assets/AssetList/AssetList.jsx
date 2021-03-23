import React, { useContext, useEffect, useState } from 'react'
import { apiNavParam } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { AssetTable } from '../../../components/assets'

const pageDefault = {
    size:10, 
    totalElements:0, 
    totalPages:0, 
    number:0, 
    nextUrl: '', 
    previousUrl: '',
    rowsPerPageOptions: [5, 10, 15, 20]
}

export default function AssetList() {
    const { assets:assetsUrl } = useContext(APIUrlsContext)
    const [apiUrl, setApiUrl] = useState()

    const [page, setPage] = useState(pageDefault)
    const [pageSize, setPageSize] = useState(pageDefault.size)
    const [assets, setAssets] = useState([])

    useEffect(() => {
        if (assetsUrl) setApiUrl(assetsUrl.href)
    }, [assetsUrl])

    useEffect(() => {
        if (apiUrl) {
            listAssets()
        }
    }, [apiUrl, pageSize])

    const listAssets = () => {
        apiNavParam(apiUrl, { size: pageSize })
            .then(data => {
                let pageAttr = {
                    size: pageSize,
                    totalElements: data.page.totalElements,
                    totalPages: data.page.totalPages,
                    number: data.page.number,
                    nextUrl: data._links.next ? data._links.next.href : null,
                    previousUrl: data._links.prev ? data._links.prev.href : null
                }

                let newPage = page
                Object.entries(pageAttr).forEach(attributes => {page[attributes[0]] = attributes[1]})

                setPage(newPage)

                return data._embedded.assets
            }).then(assets => setAssets(assets))
    }

    const handlePageChange = nextPageNumber => {
        let newUrl = nextPageNumber && nextPageNumber >= page.number ? page.nextUrl : page.previousUrl
        setApiUrl(newUrl)
    }

    const handleRowsPerPageChange = rowsNumber => {
        if (rowsNumber) {
            setPageSize(rowsNumber)
        }
    }

    return (
        <>
            <AssetTable 
                onChangeList={() =>  listAssets()}
                assets={assets} 
                page={page} 
                onPageChange={handlePageChange}
                onRowsSizeChange={handleRowsPerPageChange} />
        </>
    )


}