const student = [
  {
    id: 1,
    name: 'Alice Nguyen',
    age: 20,
    score: 85,
    email: 'alice.nguyen@example.com',
    gender: 'female',
    major: 'Computer Science',
  },
  {
    id: 2,
    name: 'Benjamin Carter',
    age: 22,
    score: 72,
    email: 'ben.carter@example.com',
    gender: 'male',
    major: 'Mathematics',
  },
  {
    id: 3,
    name: 'Chloe Zhang',
    age: 19,
    score: 90,
    email: 'chloe.zhang@example.com',
    gender: 'female',
    major: 'Design',
  },
  {
    id: 4,
    name: 'Daniel Li',
    age: 21,
    score: 65,
    email: 'daniel.li@example.com',
    gender: 'male',
    major: 'Business',
  },
  {
    id: 5,
    name: 'Emma Vo',
    age: 23,
    score: 78,
    email: 'emma.vo@example.com',
    gender: 'female',
    major: 'Psychology',
  },
  {
    id: 6,
    name: 'Franklin White',
    age: 20,
    score: 82,
    email: 'frank.white@example.com',
    gender: 'male',
    major: 'Engineering',
  },
  {
    id: 7,
    name: 'Grace Lin',
    age: 24,
    score: 88,
    email: 'grace.lin@example.com',
    gender: 'female',
    major: 'Nursing',
  },
  {
    id: 8,
    name: 'Henry Wang',
    age: 21,
    score: 60,
    email: 'henry.wang@example.com',
    gender: 'male',
    major: 'Philosophy',
  },
  {
    id: 9,
    name: 'Isabella Chen',
    age: 22,
    score: 95,
    email: 'isabella.chen@example.com',
    gender: 'female',
    major: 'Biotechnology',
  },
  {
    id: 10,
    name: 'Jordan Lam',
    age: 20,
    score: 70,
    email: 'jordan.lam@example.com',
    gender: 'non-binary',
    major: 'Sociology',
  },
  {
    id: 11,
    name: 'Kevin Smith',
    age: 18,
    score: 55,
    email: 'kevin.le@example.com',
    gender: 'male',
    major: 'Economics',
  },
  {
    id: 12,
    name: 'Laura Smith',
    age: 25,
    score: 83,
    email: 'laura.smith@example.com',
    gender: 'female',
    major: 'Education',
  },
  {
    id: 13,
    name: 'Michael Lee',
    age: 22,
    score: 68,
    email: 'michael.huynh@example.com',
    gender: 'male',
    major: 'Computer Science',
  },
  {
    id: 14,
    name: 'Nina Wang',
    age: 21,
    score: 91,
    email: 'nina.quach@example.com',
    gender: 'female',
    major: 'Design',
  },
  {
    id: 15,
    name: 'Olivia Zhou',
    age: 20,
    score: 74,
    email: 'olivia.zhou@example.com',
    gender: 'female',
    major: 'Law',
  },
  {
    id: 16,
    name: 'Jasmin Kim',
    age: 23,
    score: 88,
    email: 'phuong.tran@example.com',
    gender: 'non-binary',
    major: 'Political Science',
  },
  {
    id: 17,
    name: 'Qi Liu',
    age: 21,
    score: 66,
    email: 'qi.liu@example.com',
    gender: 'male',
    major: 'Chemistry',
  },
  {
    id: 18,
    name: 'Rachel Gao',
    age: 22,
    score: 92,
    email: 'rachel.gao@example.com',
    gender: 'female',
    major: 'Biomedical Science',
  },
  {
    id: 19,
    name: 'Samuel Tan',
    age: 19,
    score: 61,
    email: 'samuel.tan@example.com',
    gender: 'male',
    major: 'Architecture',
  },
  {
    id: 20,
    name: 'Tracy Cooper',
    age: 24,
    score: 98,
    email: 'tracy.cooper@example.com',
    gender: 'female',
    major: 'Data Science',
  },
];

/* const jsonString = JSON.stringify(student);
console.log('JSON String:', jsonString);
 */

// 1. filter by score

function filterByScore(min, max) {
  return student.filter(
    (student) => student.score >= min && student.score <= max
  );
}

console.log(filterByScore(60, 70)); // Filter students with score between 60 and 70

// 2. filter by major

function filterByMajor(major) {
  return student.filter(
    (student) => student.major.toLowerCase() === major.toLowerCase()
  );
}

console.log(filterByMajor('Computer Science')); // Filter students with major in Computer Science

// 3. filter by gender

function filterByGender(gender) {
  return student.filter(
    (student) => student.gender.toLowerCase() === gender.toLowerCase()
  );
}

// console.log(filterByGender('Female')); // Filter female students

// 4. Search by name or email
function searchByNameOrEmail(query) {
  return student.filter(
    (student) =>
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase())
  );
}

// console.log(searchByNameOrEmail('Franklin')); // Search for students with name or email containing 'Alice'

// 5. Combine filters
function applyFilters(filters) {
  // Use the students array (not student) and filter it
  return student.filter((s) => {
    // Filter by gender
    if (
      filters.gender &&
      s.gender.toLowerCase() !== filters.gender.toLowerCase()
    ) {
      return false;
    }

    // Filter by major
    if (
      filters.major &&
      s.major.toLowerCase() !== filters.major.toLowerCase()
    ) {
      return false;
    }

    // Filter by score
    if (filters.score) {
      if (filters.score.min && s.score < filters.score.min) {
        return false;
      }
      if (filters.score.max && s.score > filters.score.max) {
        return false;
      }
    }

    // If passed all filters
    return true;
  });
}

// Define filter criteria
const results = applyFilters({
  gender: 'female',
  major: 'Design',
  score: { min: 70, max: 100 },
});

// Apply filters and get results
console.log(results);
