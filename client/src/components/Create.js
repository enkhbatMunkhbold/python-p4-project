import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import "../stylesheets/create.css"

const Create = ({ onAddMission, onAddAstronauts, onUpdateAstronauts, astronauts }) => {
  const navigate = useNavigate()

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    date: Yup.string()
      .required('Date is required')
      .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/, 'Date must be in MM/DD/YYYY format'),
    image_url: Yup.string()
      .required('Image link is required')
      .matches(/^\/images\/.*\.(jpg|png|gif|jpeg)$/, 'Must be a valid image path'),
    crew: Yup.string()
      .required('Crew is required')
      .matches(/^[a-zA-Z0-9., ]+$/, 'Crew names must be alphanumeric and separated by commas'),
    space_shuttle: Yup.string()
      .required('Space shuttle is required')
      .max(50, 'Space shuttle name must be at most 50 characters long'),
    country: Yup.string()
      .required('Country is required')
      .max(50, 'Country name must be at most 50 characters long'),
    isFavorite: Yup.boolean()
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      image_url: '',
      crew: '',
      space_shuttle: '',
      country: '',
      isFavorite: true
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const crewNames = values.crew.split(',').map(name => name.trim())
      const existingAstronauts = astronauts.filter(astro => crewNames.some(name => astro.name === name))
      const newAstronautNames = crewNames.filter(name => !astronauts.some(astro => astro.name === name))
      const missionData = { ...values, crew: crewNames }

      try {
        const missionResponse = await fetch('/missions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(missionData)
        })
        const missionResult = await missionResponse.json()
        onAddMission(missionResult)

        for (let astro of existingAstronauts) {
          const updatedMissions = [...astro.missions, values.name]
          await fetch(`/astronauts/${astro.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ missions: updatedMissions })
          })
          .then(res => res.json())
          .then(onUpdateAstronauts)
        }

        if (newAstronautNames.length > 0) {
          const newAstronauts = newAstronautNames.map(name => ({
            name: name,
            missions: [values.name],
            country: values.country,
            isInService: values.isInService
          }))
          
          const crewResults = []
          for (const astronaut of newAstronauts) {
            const crewResponse = await fetch('/astronauts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(astronaut)
            })
            const crewResult = await crewResponse.json()
            crewResults.push(crewResult)
          }
          onAddAstronauts(crewResults)
        }

        navigate('/missions')
      } catch (error) {
        console.error("Error submitting data:", error)
      }
    }
  })

  return (
    <div className="create">
      <div className='new-mission-form'>
        <h1 className='title'>New Mission</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="missionName" className="form-label">Name</label>
            <input type="text" className="form-control" 
              name="name" value={formik.values.name} 
              onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && <div className="form-text text-danger">{formik.errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="missionDate" className="form-label">Date</label>
            <input type="text" className="form-control" 
              name="date" value={formik.values.date} 
              onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
            {formik.touched.date && formik.errors.date && <div className="form-text text-danger">{formik.errors.date}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="missionImage" className="form-label">Image Link</label>
            <input type="text" className="form-control" 
              name="image_url" value={formik.values.image_url} 
              onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && <div className="form-text text-danger">{formik.errors.image}</div>}
          </div>          
          <div className="mb-3">
            <label htmlFor="crew" className="form-label">Crew</label>
            <input type="text" className="form-control" 
              name="crew" value={formik.values.crew} 
              onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
            {formik.touched.crew && formik.errors.crew && <div className="form-text text-danger">{formik.errors.crew}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="space_shuttle" className="form-label">Space Shuttle</label>
            <input type="text" className="form-control" 
              name="space_shuttle" value={formik.values.space_shuttle}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
            {formik.touched.space_shuttle && formik.errors.space_shuttle && <div className="form-text text-danger">{formik.errors.space_shuttle}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input type="text" className="form-control" 
              name="country" value={formik.values.country}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
            {formik.touched.country && formik.errors.country && <div className="form-text text-danger">{formik.errors.country}</div>}
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" 
              name="isFavorite" checked={formik.values.isFavorite} 
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="isFavorite">Favorite</label>
          </div>
          <button type="submit" className="btn btn-light">Submit</button>
        </form>
      </div>      
    </div>
  )
}

export default Create;