import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import CelebIcon from '../assets/celebIcon.png';
import '../pages/Celebrities/celebrities.css';
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

function CustomAccordion({
  celeb,
  handleChange,
  expanded,
  handleDelete,
  handleSave,
  isEdit,
  setIsEdit,
  setEditId,
  editId,
}) {
  const [editedObj, setEditedObj] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [editedObj]);

  const onSave = () => {
    setIsEdit(false);
    setEditId(-1);
    setError('');
    setEditedObj({});
  };

  // Error First approach checking error before save
  const checkError = () => {
    console.log(editedObj);
    if (editedObj.age && !(+editedObj.age > 0)) {
      setError('Age must be greater then 0');
      return true;
    }
    if (!/^[a-zA-Z\s]*$/.test(editedObj.country)) {
      setError('Numbers and special char are not allowed in country');
      return true;
    }
    if (
      !(
        editedObj.age &&
        editedObj.country &&
        editedObj.description &&
        editedObj.first
      )
    ) {
      setError('Please fill all the fields');
      return true;
    }
  };

  return (
    <Accordion
      key={celeb.id}
      expanded={expanded === celeb.id}
      onChange={handleChange(celeb.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <div className="accordian-heading">
          <img
            style={{ borderRadius: '50%' }}
            src={celeb?.picture}
            alt="Celebrity Icon"
            height={50}
          />
          {isEdit && editId === celeb.id ? (
            <input
              style={{ marginLeft: '20px', padding: '10px' }}
              value={editedObj.first}
              onChange={(e) => {
                let temp = { ...editedObj };
                temp.first = e.target.value;
                temp.last = '';
                setEditedObj({ ...temp });
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <b style={{ marginLeft: '20px' }}>
              {celeb?.first} {celeb?.last}
            </b>
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div>
          <div className="detail-header details">
            {/* Age section */}
            <div>
              <span className="detail-header-title">Age</span>
              <div>
                {isEdit && editId === celeb.id ? (
                  <input
                    type="number"
                    style={{
                      padding: '5px',
                      width: '100px',
                    }}
                    value={
                      typeof editedObj.age === 'number'
                        ? editedObj.age
                        : new Date().getFullYear() - +celeb?.dob.split('-')[0]
                    }
                    onChange={(e) => {
                      let temp = { ...editedObj };
                      temp.age = e.target.valueAsNumber;
                      setEditedObj({ ...temp });
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {celeb?.age
                      ? celeb?.age
                      : new Date().getFullYear() -
                        +celeb?.dob.split('-')[0]}{' '}
                    Year
                  </>
                )}
              </div>
            </div>

            {/* Gender section */}
            <div>
              <span className="detail-header-title">Gender</span>
              <div>
                {isEdit && editId === celeb.id ? (
                  <select
                    style={{
                      padding: '5px',
                      width: '150px',
                    }}
                    value={editedObj.gender}
                    onChange={(e) => {
                      let temp = { ...editedObj };
                      temp.gender = e.target.value;
                      setEditedObj({ ...temp });
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Rather not say">Rather not say</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <>{celeb?.gender}</>
                )}
              </div>
            </div>

            {/* Country section */}
            <div>
              <span className="detail-header-title">Country</span>
              <div>
                {isEdit && editId === celeb.id ? (
                  <input
                    type="text"
                    style={{
                      padding: '5px',
                      width: '120px',
                    }}
                    value={editedObj.country}
                    onChange={(e) => {
                      let temp = { ...editedObj };
                      temp.country = e.target.value;
                      setEditedObj({ ...temp });
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>{celeb?.country}</>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="detail-header">
            <span className="detail-header-title">Description</span>
            <div>
              {isEdit && editId === celeb.id ? (
                <textarea
                  value={editedObj.description}
                  rows="6"
                  cols="55"
                  onChange={(e) => {
                    let temp = { ...editedObj };
                    temp.description = e.target.value;
                    setEditedObj({ ...temp });
                  }}
                />
              ) : (
                celeb?.description
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="detail-header details">
            <div>
              <span className="error-msg">{error}</span>
            </div>
            <div>
              {isEdit && editId === celeb.id ? (
                <>
                  <IconButton
                    onClick={() => {
                      setIsEdit(false);
                      setEditId(-1);
                      setError('');
                    }}
                  >
                    <HighlightOffOutlinedIcon style={{ fill: '#ff6969' }} />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setError('');
                      if (!checkError()) {
                        handleSave(celeb?.id, editedObj, onSave);
                      }
                    }}
                  >
                    <CheckCircleOutlineOutlinedIcon style={{ fill: 'green' }} />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => handleDelete(celeb.id)}>
                    <DeleteOutlineOutlinedIcon style={{ fill: '#ff6969' }} />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      setIsEdit(true);
                      setEditId(celeb.id);
                      setEditedObj({
                        ...celeb,
                        age:
                          new Date().getFullYear() - +celeb?.dob.split('-')[0],
                      });
                    }}
                  >
                    <EditOutlinedIcon style={{ fill: '#1976d2' }} />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
