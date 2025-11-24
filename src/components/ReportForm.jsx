// src/components/ReportForm.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

function ReportForm() {
  // Form values including the new image field
  const [formValues, setFormValues] = useState({
    date: '',
    time: '',
    location: '',
    species: '',
  });

  // Separate state for the uploaded image file
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State for showing messages to the user
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [uploading, setUploading] = useState(false);

  // Runs every time the user types or changes a field
  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle image file selection
  function handleImageChange(event) {
    const file = event.target.files[0];
    
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'Image file is too large. Please choose a file under 5MB.',
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setStatus({
          type: 'error',
          message: 'Please select a valid image file (JPG, PNG, etc.).',
        });
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous error
      setStatus({ type: 'idle', message: '' });
    }
  }

  // Remove selected image
  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  // Upload image to Supabase Storage
  async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `sightings/${fileName}`;

    const { data, error } = await supabase.storage
      .from('tick-images') // Make sure this bucket exists in Supabase
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('tick-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }

  // Runs when the user clicks "Submit sighting"
  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    // Basic validation: all 4 required fields must be filled
    if (
      !formValues.date ||
      !formValues.time ||
      !formValues.location ||
      !formValues.species
    ) {
      setStatus({
        type: 'error',
        message: 'Please fill in date, time, location and species before submitting.',
      });
      return;
    }

    setUploading(true);

    try {
      let imageUrl = null;

      // Upload image if one was selected
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          setStatus({
            type: 'error',
            message: 'Failed to upload image. Please try again.',
          });
          setUploading(false);
          return;
        }
      }

      // Insert the sighting data into Supabase
      const { data, error } = await supabase
        .from('sightings')
        .insert([
          {
            date: formValues.date,
            time: formValues.time,
            location: formValues.location,
            species: formValues.species,
            image_url: imageUrl, // Add the image URL to the database
          },
        ]);

      if (error) {
        console.error('Supabase insert error:', error);
        setStatus({
          type: 'error',
          message: 'Sorry, something went wrong while saving your sighting.',
        });
        setUploading(false);
        return;
      }

      console.log('Inserted row:', data);

      // Show success message
      setStatus({
        type: 'success',
        message: 'Thank you! Your tick sighting has been saved.',
      });

      // Clear the form after success
      setFormValues({
        date: '',
        time: '',
        location: '',
        species: '',
      });
      setImageFile(null);
      setImagePreview(null);

    } catch (err) {
      console.error('Unexpected error:', err);
      setStatus({
        type: 'error',
        message: 'Unexpected error while saving your sighting.',
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      className="report-form"
      onSubmit={handleSubmit}
      aria-label="Report a tick sighting"
    >
      {/* Row with date + time side-by-side */}
      <div className="form-row">
        <label>
          Date of sighting <span className="required">*</span>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            disabled={uploading}
          />
        </label>
        <label>
          Time of sighting <span className="required">*</span>
          <input
            type="time"
            name="time"
            value={formValues.time}
            onChange={handleChange}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Location text field */}
      <label>
        Location (city / area) <span className="required">*</span>
        <input
          type="text"
          name="location"
          placeholder="e.g. Bristol city centre, local park"
          value={formValues.location}
          onChange={handleChange}
          disabled={uploading}
        />
      </label>

      {/* Species dropdown */}
      <label>
        Species <span className="required">*</span>
        <select
          name="species"
          value={formValues.species}
          onChange={handleChange}
          disabled={uploading}
        >
          <option value="">Select species</option>
          <option value="Ixodes ricinus">Ixodes ricinus</option>
          <option value="Ixodes hexagonus">Ixodes hexagonus</option>
          <option value="Dermacentor reticulatus">Dermacentor reticulatus</option>
          <option value="Unknown">Unknown / unsure</option>
        </select>
      </label>

      {/* Image upload */}
      <label>
        Upload Image (optional)
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={uploading}
          className="file-input"
        />
        <span className="file-note">Max file size: 5MB (JPG, PNG, etc.)</span>
      </label>

      {/* Image preview */}
      {imagePreview && (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="remove-image-button"
            disabled={uploading}
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Status message (error or success) */}
      {status.message && (
        <p
          className={
            status.type === 'error'
              ? 'form-status form-status-error'
              : 'form-status form-status-success'
          }
        >
          {status.message}
        </p>
      )}

      {/* Submit button */}
      <button 
        type="submit" 
        className="primary-button submit-button" 
        disabled={uploading}
      >
        {uploading ? 'Submitting...' : 'Submit sighting'}
      </button>
    </form>
  );
}

export default ReportForm;