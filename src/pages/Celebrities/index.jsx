import { useEffect, useState } from 'react'
import './celebrities.css'
import celebJson from '../../../celebrities.json'
import CustomAccordion from '../../components/CustomAccordion'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Modal,
	TextField
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function Celebrities() {
	const [expanded, setExpanded] = useState(false)
	const [deleteId, setDeleteId] = useState(-1)

	const [search, setSearch] = useState('')
	const [celebList, setCelebList] = useState(celebJson)
	const [celebListBkp, setCelebListBkp] = useState(celebJson)

	const [isEdit, setIsEdit] = useState(false)
	const [editId, setEditId] = useState(-1)

	const [open, setOpen] = useState(false)

	// Debouncing the Search so that for each keystrock we dont have to calculate
	useEffect(() => {
		const timeout = setTimeout(() => {
			let filteredSearch = celebListBkp.filter(
				(cel) =>
					cel.first.toLowerCase().includes(search) ||
					cel.last.toLowerCase().includes(search)
			)
			if (search.length > 0) setCelebList(filteredSearch)
			else setCelebList(celebListBkp)
		}, 300)
		return () => clearTimeout(timeout)
	}, [search])


	const handleChange = (panel) => (event, isExpanded) => {
		!isEdit && setExpanded(isExpanded ? panel : false)
	}

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}
	
	const handleDelete = (e) => {
		setCelebList(celebListBkp.filter((c) => c.id !== deleteId))
		setCelebListBkp(celebListBkp.filter((c) => c.id !== deleteId))
		handleClose()
	}

	const handleSave = (id, editedValue, callback) => {
		console.log(id, editedValue)
		let _celebList = [...celebListBkp]
		let index = celebListBkp.findIndex((c) => c.id === id)
		_celebList[index] = editedValue
		setCelebList(_celebList)
		setCelebListBkp(_celebList)
		callback()
	}

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div className="container">
			<div className="celeb-list-container">
				{/* Search Field */}
				<TextField
					className="search-bar"
					id="outlined-size-small"
					placeholder="Search User"
					size="small"
					value={search}
					onChange={handleSearch}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						)
					}}
				/>


				{/* Celebrities List of Accordian */}
				{celebList.length > 0 &&
					celebList.map((celeb, i) => {
						return (
							<CustomAccordion
								celeb={celeb}
								handleChange={handleChange}
								expanded={expanded}
								handleDelete={(id) => {
									setDeleteId(id)
									handleOpen()
								}}
								handleSave={handleSave}
								isEdit={isEdit}
								setIsEdit={setIsEdit}
								setEditId={setEditId}
								editId={editId}
							/>
						)
					})}
			</div>


			{/* Modal for delete the celebrities */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="modal">
					<div className="details">
						<div>Are you sure you want to delete?</div>
						<div>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</div>
					</div>
					<div style={{ marginTop: '40px' }} className="float-right">
						<Button
							onClick={handleClose}
							variant="outlined"
							color="inherit"
						>
							Cancel
						</Button>
						<Button
							style={{ marginLeft: '20px' }}
							size="md"
							variant="contained"
							color="error"
							onClick={handleDelete}
						>
							Delete
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default Celebrities
