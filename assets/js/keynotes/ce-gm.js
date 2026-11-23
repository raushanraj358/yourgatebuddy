// Offline key notes: CE · Geomatics Engineering. Keys are chapter ids from data.js.
export const CONTENT = {
  levelling: {
    overview: 'Surveying principles and levelling: reduction of levels, curvature and refraction corrections, reciprocal levelling, contours and error adjustment.',
    sections: [
      ['Principles of surveying', [
        'Work from the whole to the part (control first, details later) to stop errors accumulating.',
        'Plane surveying ignores earth curvature (areas under about 250 km²); geodetic surveying includes it.',
        'Scales: representative fraction (RF); shrunk scale correction for map shrinkage.',
      ]],
      ['Levelling and contouring', [
        'Height of instrument (HI) method: HI = RL + BS; RL = HI − FS. Check: ΣBS − ΣFS = last RL − first RL.',
        'Rise and fall method: arithmetic check includes intermediate sights; better for accuracy.',
        'Curvature correction −0.0785d² m; refraction +0.0112d² m; combined −0.0673d² m (d in km).',
        'Reciprocal levelling cancels curvature, refraction and collimation errors: true difference = mean of the two apparent differences.',
        'Distance to the visible horizon d = 3.855√h km (h in m, with refraction).',
        'Contours: closely spaced = steep; never cross (except overhangs); V-shapes point uphill across valleys and downhill across ridges.',
      ]],
      ['Errors and adjustments', [
        'Permanent adjustments of a dumpy level: line of collimation parallel to the bubble axis (two-peg test).',
        'Collimation error is cancelled by equal back-sight and fore-sight distances.',
        'Closing error is distributed proportional to distance (or number of set-ups).',
      ]],
    ],
    exam: ['Reduced level by HI or rise-and-fall method (NAT).', 'Combined curvature and refraction correction.', 'True level difference from reciprocal levelling.'],
    traps: ['Adding the curvature correction; it makes the staff reading too large, so the correction is negative.'],
  },

  theodolite: {
    overview: 'Distance and angle measurement, traversing and triangulation, and setting out curves.',
    sections: [
      ['Distance and angle measurement', [
        'Tape corrections: temperature αLΔT, pull (P − P₀)L/(AE), sag −w²L³/(24P²), slope −h²/(2L) (or L(1 − cos θ)), standardisation.',
        'Normal tension: pull at which pull and sag corrections cancel.',
        'Tacheometry: D = (f/i)s + (f + d) = ks + C (k = 100, C = 0 for an anallactic lens). Inclined sights: D = ks cos²θ, V = ks sin 2θ/2.',
        'Theodolite: face left and face right readings cancel most instrumental errors.',
        'EDM measures distance by phase comparison of modulated waves.',
      ]],
      ['Traversing and triangulation', [
        'Whole circle bearing and reduced bearing; back bearing = fore bearing ± 180°.',
        'Local attraction is found when fore and back bearings differ by other than 180°.',
        'Latitude = L cos θ, departure = L sin θ. Closing error from ΣL and ΣD.',
        'Bowditch rule (compass rule) distributes errors in proportion to line lengths; transit rule in proportion to latitudes/departures (for angles more precise than distances).',
        'Sum of interior angles of a closed traverse = (2n − 4) × 90°.',
        'Triangulation: well-conditioned triangles (angles between 30° and 120°); baseline measured precisely.',
      ]],
      ['Curves', [
        'Simple circular curve: tangent length T = R tan(Δ/2); length l = πRΔ/180; long chord 2R sin(Δ/2); mid-ordinate R(1 − cos(Δ/2)).',
        'Degree of curve (30 m arc): R ≈ 1719/D.',
        'Setting out by Rankine’s deflection angles: δ = 1718.9c/R minutes for chord c.',
      ]],
    ],
    exam: ['Tape corrections (NAT).', 'Tacheometric distance and elevation.', 'Curve tangent length or deflection angles.'],
    traps: ['Applying sag correction with the wrong sign; it always shortens the measured length.'],
  },

  rs: {
    overview: 'Photogrammetry, remote sensing and GIS/GPS: scale and relief displacement of photos, electromagnetic spectrum and sensors, and spatial data basics.',
    sections: [
      ['Photogrammetry', [
        'Vertical photo scale S = f/(H − h) (H flying height above datum, h ground elevation).',
        'Relief displacement d = rh/H (radial from the principal point).',
        'Parallax and height difference: Δh = (H − h)Δp/(b + Δp) (b = photo base).',
        'Overlap: about 60% forward and 30% side for stereoscopic coverage.',
      ]],
      ['Remote sensing principles', [
        'Electromagnetic windows: visible (0.4–0.7 µm), near-IR (vegetation is bright), thermal IR, microwave (all-weather radar).',
        'Resolutions: spatial, spectral, radiometric (bits), temporal (revisit).',
        'Passive sensors use reflected/emitted energy; active sensors (radar, LiDAR) provide their own.',
        'NDVI = (NIR − Red)/(NIR + Red), from −1 to +1; healthy vegetation is high.',
      ]],
      ['GIS and GPS basics', [
        'Vector data (points, lines, polygons) vs raster (grid cells). Overlay, buffer and network analysis.',
        'GPS needs signals from at least 4 satellites for a 3-D fix (3 positions + receiver clock). DOP measures geometry quality.',
        'Errors: ionospheric/tropospheric delay, multipath, satellite geometry; DGPS corrects using a base station.',
      ]],
    ],
    exam: ['Photo scale or relief displacement (NAT).', 'Height from parallax difference.', 'NDVI or minimum satellites for a GPS fix.'],
    traps: ['Using flying height above datum without subtracting ground elevation for scale.'],
  },
};
