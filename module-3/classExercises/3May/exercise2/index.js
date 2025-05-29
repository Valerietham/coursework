fetch('https://taylor-swift-api.sarbo.workers.dev/songs')
  .then((response) => response.json())
  .then((data) => {
    // Then => it will return the result of the previous promis
    taylorSwiftResult = data;

    // Access or update the
    console.log('✅ User data:', taylorSwiftResult);
  })
  .catch((err) => console.error('❌ Error:', err));
