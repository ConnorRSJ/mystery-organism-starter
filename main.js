// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      let baseIndex = Math.floor(Math.random() * 15)
      let oldBase = dna[baseIndex];
      while (oldBase === dna[baseIndex]) {
        dna[baseIndex] = returnRandBase();
      }
    },
    compareDNA(otherSpecimen) {
      let similar = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (otherSpecimen.dna[i] === this.dna[i]) {
          similar++;
        }
      }
      console.log(`Specimen ${this.specimenNum} and Speciman ${otherSpecimen.specimenNum} have ${Math.round(similar / this.dna.length * 100)}% DNA in common.`);
      return [this.specimenNum, otherSpecimen.specimenNum, Math.round(similar / this.dna.length * 100)];
    },
    willLikelySurvive() {
      let chance = 0;
      for (let i of this.dna) {
        if (i === 'C' || i === 'G') {
          chance++;
        }
      }
      return (chance / this.dna.length * 100) >= 60
    }
  }
}

let pAequorBatch = [];
let strand;

while (pAequorBatch.length < 30) {
  strand = pAequorFactory((pAequorBatch.length + 1), mockUpStrand());
  if (strand.willLikelySurvive()) {
    pAequorBatch.push(strand);
  }
}

let closestRelatives = [0, 0, 0];

for (let i = 0; i < pAequorBatch.length; i++) {
  for (let j = i + 1; j < pAequorBatch.length; j++) {
    if (pAequorBatch[i].compareDNA(pAequorBatch[j])[2] > closestRelatives[2]) {
      closestRelatives = pAequorBatch[i].compareDNA(pAequorBatch[j]);
    }
  }
}

console.log(`Speciemen ${pAequorBatch[closestRelatives[0]].specimenNum} [${pAequorBatch[closestRelatives[0]].dna}] and Speciemen ${pAequorBatch[closestRelatives[1]].specimenNum} [${pAequorBatch[closestRelatives[1]].dna}] share the most DNA at ${closestRelatives[2]}%.`);

// console.log(pAequorBatch);

// let strand1 = pAequorFactory(1, mockUpStrand());

// let strand2 = pAequorFactory(2, mockUpStrand());

// console.log(strand1.dna);

// console.log(strand2.dna);

// strand1.willLikelySurvive();

// if (strand1.willLikelySurvive() === false) {
//   console.log('This is false');
// }