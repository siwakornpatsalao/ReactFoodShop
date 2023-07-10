import React, { useState } from 'react';
import { useEffect } from 'react';

const AddPage = () => {
  const [e4, setE4] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormValid2, setIsFormValid2] = useState(false);
  const [isFormValid3, setIsFormValid3] = useState(false);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [url, setUrl] = useState(null);
  const [platform, setPlatform] = useState('');
  const [publisher, setPublisher] = useState('');
  const [developer, setDeveloper] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [id, setId] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [menu, setMenu] = useState(false);
  const [shortDescription, setShortDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [datas, setDatas] = useState([]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUrl(null);
    }
  };

  const handleGoIndex = () => {
    const result = window.confirm('Are You Sure?');
    if (result) {
      setId(getMaxId() + 1);
      // Perform your API call or submit the form data
      // ...
    }
  };

  const getMaxId = () => {
    const maxId = datas.reduce((max, item) => (item.id > max ? item.id : max), datas[0].id);
    return maxId;
  };

  const reset = () => {
    setE4(1);
    setTitle('');
    setGenre('');
    setThumbnail(null);
    setUrl(null);
    setPlatform('');
    setPublisher('');
    setDeveloper('');
    setGameUrl('');
    setShortDescription('');
    setDate(new Date().toISOString().substr(0, 10));
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/games');
        const data = await response.json();
        const { Games, genres, platforms } = data;
        // Sort Games array based on release_date
        Games.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
        const categories = [
          ...new Set(genres), //ใช้ Set เพื่อกำจัดค่าซ้ำในอาร์เรย์ array และใช้ spread operator (...) เพื่อแปลง Set กลับเป็นอาร์เรย์
        ];
        
        setDatas(Games);
        setGenres(categories);
        setPlatforms(platforms);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <div style={{ marginLeft: '300px' }}>
        <img
          src="https://images.pexels.com/photos/1346154/pexels-photo-1346154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          height="700"
          style={{ maxWidth: '440px' }}
          alt="Game"
        />
        <div style={{ maxWidth: '1000px', width: '50%' }}>
          <div>
            <div>
              <div>
                Basic Information
                <small>Summarize if needed</small>
              </div>
            </div>
            <div>
              <div>Specification</div>
            </div>
            <div>
              <div>Add Game Description</div>
            </div>
          </div>

          <div>
            {e4 === 1 && (
              <div>
                <div>
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Game Title"
                    />
                  </div>
                  <div>
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="Select Genre"
                    >
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>
                  {!thumbnail && (
                    <div>
                      <input type="file" onChange={handleThumbnailChange} accept="image/*" />
                    </div>
                  )}
                  {thumbnail && (
                    <img src={url} alt="Thumbnail" width="250.25" height="270.66" />
                  )}
                </div>
                <button disabled={!isFormValid} onClick={() => setE4(2)}>
                  Continue
                </button>
                <button onClick={() => setE4(1)}>Cancel</button>
              </div>
            )}
            {e4 === 2 && (
              <div>
                <div>
                  <div>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      placeholder="Select Platform"
                    >
                      {platforms.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                      placeholder="Publisher"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={developer}
                      onChange={(e) => setDeveloper(e.target.value)}
                      placeholder="Developer"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={gameUrl}
                      onChange={(e) => setGameUrl(e.target.value)}
                      placeholder="Game URL (Optional)"
                    />
                  </div>
                  <div>
                    <div>
                      <input
                        type="text"
                        value={date}
                        readOnly
                        placeholder="Pick Game Released Date"
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        max={new Date().toISOString().substr(0, 10)}
                        onBlur={() => setMenu(false)}
                        onFocus={() => setMenu(true)}
                      />
                    </div>
                  </div>
                </div>
                <button disabled={!isFormValid2} onClick={() => setE4(3)}>
                  Continue
                </button>
                <button onClick={() => setE4(1)}>Cancel</button>
              </div>
            )}
            {e4 === 3 && (
              <div>
                <div>
                  <div>
                    <input
                      type="text"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Game Description"
                    />
                  </div>
                </div>
                <button disabled={!isFormValid3} onClick={handleGoIndex}>
                  Continue</button>
                <button onClick={() => setE4(2)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
