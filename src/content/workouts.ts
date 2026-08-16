import type { WorkoutCircuit } from './types';

const rest = 40;

export const workouts: WorkoutCircuit[] = [
  {
    id: 'workout-a',
    letter: 'A',
    passes: { min: 2, max: 4 },
    restBetweenExercisesSec: rest,
    restBetweenPassesSec: '60–120 s',
    exercises: [
      {
        id: 'a1',
        mode: 'reps',
        target: { min: 20, max: 40 },
        restSec: rest,
        tx: {
          en: { name: 'Jumping jacks', instructions: 'Feet together, arms by your sides; jump, spreading your feet and raising your arms overhead, then jump back to start.' },
          pt: { name: 'Polichinelo', instructions: 'Pés juntos, braços ao lado do corpo; salta separando os pés e elevando os braços acima da cabeça; salta de volta.' }
        }
      },
      {
        id: 'a2',
        mode: 'time',
        target: { min: 30, max: 60 },
        restSec: rest,
        tx: {
          en: { name: 'Front plank', instructions: 'Lie on your stomach, plant your elbows with hands flat, lift your hips and keep your body in a straight line.' },
          pt: { name: 'Prancha frontal', instructions: 'De barriga para baixo, apoia os cotovelos, eleva a anca e mantém o corpo alinhado.' }
        }
      },
      {
        id: 'a3',
        mode: 'reps',
        target: { min: 10, max: 20 },
        restSec: rest,
        tx: {
          en: { name: 'Go-and-return jog', instructions: 'Mark 10–20 m, jog to the mark, squat and touch the ground, then jog back and repeat.' },
          pt: { name: 'Corrida vai e vem', instructions: 'Marca 10–20 m, corre até à marca, agacha e toca o chão, volta a correr e repete.' }
        }
      },
      {
        id: 'a4',
        mode: 'reps',
        target: { min: 15, max: 30 },
        restSec: rest,
        tx: {
          en: { name: 'Squat jumps', instructions: 'Feet shoulder-width apart; squat, jump, and land softly by bending your knees.' },
          pt: { name: 'Agachamento com salto', instructions: 'Pés à largura dos ombros; agacha, salta e aterra absorvendo o impacto com os joelhos.' }
        }
      },
      {
        id: 'a5',
        mode: 'time',
        target: { min: 30, max: 60 },
        restSec: rest,
        tx: {
          en: { name: 'High knees', instructions: 'Run on the spot, driving your knees to hip height and pumping your arms.' },
          pt: { name: 'Corrida estacionária', instructions: 'Corre sem sair do lugar, elevando os joelhos até à anca e movendo os braços.' }
        }
      }
    ]
  },
  {
    id: 'workout-b',
    letter: 'B',
    passes: { min: 2, max: 4 },
    restBetweenExercisesSec: rest,
    restBetweenPassesSec: '60–120 s',
    exercises: [
      {
        id: 'b1',
        mode: 'time',
        target: { min: 15, max: 30 },
        restSec: rest,
        tx: {
          en: { name: 'Jumping lunge', instructions: 'Lunge with one leg forward, rise and switch legs mid-air, landing in a new lunge.' },
          pt: { name: 'Afundo com salto', instructions: 'Faz um afundo, salta e alterna as pernas no ar, aterrando num novo afundo.' }
        }
      },
      {
        id: 'b2',
        mode: 'reps',
        target: { min: 10, max: 25 },
        restSec: rest,
        tx: {
          en: { name: 'Reverse Nordic curl', instructions: 'Kneel with arms at shoulder height, lean back slowly with your core tight, then return.' },
          pt: { name: 'Flexão nórdica reversa', instructions: 'Ajoelha-te com os braços à frente, inclina o tronco para trás com o abdómen contraído e volta.' }
        }
      },
      {
        id: 'b3',
        mode: 'reps',
        target: { min: 15, max: 30 },
        restSec: rest,
        tx: {
          en: { name: 'Squat jumps', instructions: 'Feet shoulder-width apart; squat, jump, and land softly by bending your knees.' },
          pt: { name: 'Agachamento com salto', instructions: 'Pés à largura dos ombros; agacha, salta e aterra suavemente.' }
        }
      },
      {
        id: 'b4',
        mode: 'reps',
        target: { min: 10, max: 30 },
        restSec: rest,
        tx: {
          en: { name: 'Triceps dips', instructions: 'On a sturdy bench facing away, lower your hips as you bend your elbows, then push back up.' },
          pt: { name: 'Tríceps mergulho', instructions: 'De costas para um banco, apoia as mãos, desce a anca fletindo os cotovelos e sobe.' }
        }
      },
      {
        id: 'b5',
        mode: 'time',
        target: { min: 30, max: 60 },
        restSec: rest,
        tx: {
          en: { name: 'Front plank', instructions: 'Plant your elbows, lift your hips and hold a straight line with the core tight.' },
          pt: { name: 'Prancha frontal', instructions: 'Apoia os cotovelos, eleva a anca e mantém a posição com o abdómen contraído.' }
        }
      },
      {
        id: 'b6',
        mode: 'reps',
        target: { min: 5, max: 15 },
        restSec: rest,
        tx: {
          en: { name: 'Half burpee', instructions: 'Squat, place hands on the floor, step back to a plank, step in and jump up.' },
          pt: { name: 'Meio burpee', instructions: 'Agacha, apoia as mãos no chão, estende as pernas para a prancha, volta e salta.' }
        }
      },
      {
        id: 'b7',
        mode: 'reps',
        target: { min: 20, max: 40 },
        restSec: rest,
        tx: {
          en: { name: 'Floor sit-ups', instructions: 'Lie face up with knees bent, hands by your ears, and lift your shoulders off the floor.' },
          pt: { name: 'Abdominal supra solo', instructions: 'Deita-te de barriga para cima com os joelhos fletidos e eleva os ombros do chão.' }
        }
      }
    ]
  },
  {
    id: 'workout-c',
    letter: 'C',
    passes: { min: 2, max: 4 },
    restBetweenExercisesSec: rest,
    restBetweenPassesSec: '60–120 s',
    exercises: [
      {
        id: 'c1',
        mode: 'time',
        target: { min: 30, max: 60 },
        restSec: rest,
        tx: {
          en: { name: 'Plank shoulder taps', instructions: 'In a plank position, alternate touching each shoulder with the opposite hand.' },
          pt: { name: 'Prancha com toque no ombro', instructions: 'Na posição de prancha, alterna tocar o ombro esquerdo com a mão direita e vice-versa.' }
        }
      },
      {
        id: 'c2',
        mode: 'time',
        target: { min: 20, max: 50 },
        restSec: rest,
        tx: {
          en: { name: 'Knee-high jumps', instructions: 'Jump and lift your knees to hip height, tapping them with your hands; land on bent knees.' },
          pt: { name: 'Salto com flexão de joelhos', instructions: 'Salta erguendo os joelhos até à anca, toca-os com as mãos e aterra com os joelhos fletidos.' }
        }
      },
      {
        id: 'c3',
        mode: 'time',
        target: { min: 30, max: 60 },
        restSec: rest,
        tx: {
          en: { name: 'High knees', instructions: 'Run on the spot, driving your knees to hip height and pumping your arms.' },
          pt: { name: 'Corrida estacionária', instructions: 'Corre sem sair do lugar, elevando os joelhos à altura da anca.' }
        }
      },
      {
        id: 'c4',
        mode: 'reps',
        target: { min: 5, max: 15 },
        restSec: rest,
        tx: {
          en: { name: 'Burpee', instructions: 'Squat, kick back to a plank, do a push-up, return, and jump up.' },
          pt: { name: 'Burpee', instructions: 'Agacha, vai à prancha, faz uma flexão, volta e salta.' }
        }
      },
      {
        id: 'c5',
        mode: 'time',
        target: { min: 15, max: 30 },
        restSec: rest,
        tx: {
          en: { name: 'Plyometric lunge-squat', instructions: 'Jump lunge to lunge, then land in a squat and jump back into a lunge.' },
          pt: { name: 'Afundo e agachamento pliométrico', instructions: 'Alterna afundos com saltos e aterra num agachamento antes de voltar ao afundo.' }
        }
      }
    ]
  },
  {
    id: 'workout-d',
    letter: 'D',
    passes: { min: 2, max: 4 },
    restBetweenExercisesSec: rest,
    restBetweenPassesSec: '60–120 s',
    exercises: [
      {
        id: 'd1',
        mode: 'time',
        target: { min: 15, max: 30 },
        restSec: rest,
        tx: {
          en: { name: 'High kicks', instructions: 'Standing, kick one straight leg up while the supporting leg stays slightly bent; alternate.' },
          pt: { name: 'Chute alto', instructions: 'Em pé, eleva uma perna estendida num movimento de chute; a perna de apoio fica semifletida; alterna.' }
        }
      },
      {
        id: 'd2',
        mode: 'time',
        target: { min: 20, max: 50 },
        restSec: rest,
        tx: {
          en: { name: 'Cross-body knee raises', instructions: 'Lift each knee toward the opposite elbow, adding a small jump while twisting your trunk.' },
          pt: { name: 'Elevação de joelhos cruzando os braços', instructions: 'Eleva o joelho em direção ao cotovelo oposto, com um pequeno salto e rotação do tronco.' }
        }
      },
      {
        id: 'd3',
        mode: 'time',
        target: { min: 30, max: 60 },
        restSec: rest,
        tx: {
          en: { name: 'High knees', instructions: 'Run on the spot, driving your knees to hip height and pumping your arms.' },
          pt: { name: 'Corrida estacionária', instructions: 'Corre no lugar, elevando os joelhos até à anca.' }
        }
      },
      {
        id: 'd4',
        mode: 'reps',
        target: { min: 20, max: 40 },
        restSec: rest,
        tx: {
          en: { name: 'Jumping jacks', instructions: 'Jump while spreading your feet and raising your arms overhead; jump back to start.' },
          pt: { name: 'Polichinelo', instructions: 'Salta abrindo os pés e elevando os braços por cima da cabeça; volta à posição inicial.' }
        }
      },
      {
        id: 'd5',
        mode: 'reps',
        target: { min: 10, max: 20 },
        restSec: rest,
        tx: {
          en: { name: 'Lateral go-and-return jog', instructions: 'Jog forward to the mark, return sideways, sideways again, then forward again; repeat the cycle.' },
          pt: { name: 'Corrida vai e vem lateral', instructions: 'Corre para a frente, volta de lado, de lado novamente e outra vez de frente; repete o ciclo.' }
        }
      }
    ]
  }
];