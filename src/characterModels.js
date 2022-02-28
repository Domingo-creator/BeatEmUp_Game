export const CharacterModels = {
        //left_offset = how much over over in the frame to shift over to make knight centered 
        //pos_offset = how much to be offset to make frames on screen match where they should be

        knight: {Idle: {row: 1, num_rows: 1, frames: 10, max_frames: 10, left_offset: 40, right_offset: 40, left_pos_offset: -60, right_pos_offset: -20, top_offset_multiplier: 1.9 },
                 lAttack: {row: 1, num_rows: 1, frames: 10, max_frames: 10, left_offset: -20, right_offset: 0, left_pos_offset: -260,right_pos_offset: -120, top_offset_multiplier: 1.9},
                 hAttack: {row: 1, num_rows: 1, frames: 6, max_frames: 6, left_offset: 20, right_offset: 20,left_pos_offset: 0,right_pos_offset: 0, top_offset_multiplier: 1.9},
                 jump: {row: 1, num_rows: 1, frames: 3, max_frames: 3, left_offset: 20, right_offset: 20, pos_offset: 0,left_pos_offset: -130,right_pos_offset: -100, top_offset_multiplier: 1.9},
                 jumpFallinbetween: {row: 1, num_rows: 1, frames: 2, max_frames: 2, left_offset: 20, right_offset: 20,left_pos_offset: 0,right_pos_offset: 0, top_offset_multiplier: 1.9},
                 Run: { row: 1, num_rows: 1, frames: 10, max_frames: 10, left_offset: 40, right_offset: 40, left_pos_offset: -40,right_pos_offset:-40, top_offset_multiplier: 1.9},
                 hit: { row: 1, num_rows: 1, frames: 1, max_frames: 1, left_offset: 0, right_offset: 0,left_pos_offset: -120,right_pos_offset:-80, top_offset_multiplier: 1.9},
                 death: { row: 1, num_rows: 1, frames: 10, max_frames: 10, left_offset: -20, right_offset: 0,left_pos_offset: -260,right_pos_offset:-120, top_offset_multiplier: 1.9},
                },
        
        skeleton:{Idle: {row: 4, num_rows: 5,frames:4, max_frames: 13, left_offset:0,right_offset:0,left_pos_offset:-80, right_pos_offset:-80, top_offset_multiplier: 1.8},
                  lAttack: {row:1, num_rows: 5,frames: 13, max_frames: 13, left_offset: 0, right_offset:0, left_pos_offset:-80, right_pos_offset: -80, top_offset_multiplier: 4.6},
                  death: {row:2, num_rows: 5, frames: 13, max_frames: 13, left_offset: 0, right_offset:0, left_pos_offset:-80, right_pos_offset: -80, top_offset_multiplier: 1.70},
                  hit: {row:2, num_rows: 5, frames: 3, max_frames: 13, left_offset: 0, right_offset:0, left_pos_offset:-80, right_pos_offset: -80, top_offset_multiplier: 1.65},
                  Run: {row:3, num_rows: 5, frames: 12, max_frames: 13, left_offset: 0, right_offset:0, left_pos_offset:-80, right_pos_offset: -80, top_offset_multiplier: 1.35},

        }
}
