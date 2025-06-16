fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Chart #1: Products per category
    // No. of products per category
    const categoryCounts = {};
    data.forEach((product) => {
      const category = product.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // x-axis and y-axis labels
    const categories = Object.keys(categoryCounts); // x-axis: Product Category
    const counts = Object.values(categoryCounts); // y-axis: No. of Products

    // Chart settings
    const productPerCategoryOptions = {
      title: { text: 'Products per Categories' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: categories,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '# products',
          type: 'bar',
          data: counts,
          itemStyle: {
            color: '#4ba4ab',
          },
        },
      ],
    };

    // Chart #2: Average Rating
    const ratingSums = {};
    const ratingCounts = {};

    data.forEach((product) => {
      const category = product.category;
      const rate = product.rating.rate; // fetch rating - e.g 3.9

      ratingSums[category] = (ratingSums[category] || 0) + rate; // adds up all the ratings within that category
      ratingCounts[category] = (ratingCounts[category] || 0) + 1; // counts how many products are in that category.
    });

    // Calculate Average Rating (Formula = Total rating / no. of products under the category)
    const avgRatings = {};
    for (let category in ratingSums) {
      avgRatings[category] = ratingSums[category] / ratingCounts[category];
    }

    const ratingCategories = Object.keys(avgRatings);
    const averageRatings = Object.values(avgRatings);

    // Chart configuration
    const ratingChartOptions = {
      title: { text: 'Average Rating per Category' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ratingCategories,
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 5,
      },
      series: [
        {
          name: 'Avg Rating',
          type: 'bar',
          data: averageRatings,
          itemStyle: {
            color: '#964eb5',
          },
        },
      ],
    };

    // Display Chart
    myChart1.setOption(productPerCategoryOptions);
    myChart2.setOption(ratingChartOptions);
  });

// Initialise the echarts
let myChart1 = echarts.init(document.getElementById('products-per-category')); // Chart #1
let myChart2 = echarts.init(document.getElementById('average-ratings'));

/*  Sample data output: {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 }
  },
 */
