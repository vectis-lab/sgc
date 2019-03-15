import { Injectable } from '@angular/core';
import { Cohort } from '../../model/cohort';

/* tslint:disable:max-line-length */
const COHORTS = new Map<string, Cohort>([
    [
        'aspree',
        {
            id: 'aspree',
            link: 'http://www.aspree.org/aus/',
            title: 'ASPREE',
            summary: '',
            tags: ['healthy', 'disease free'],
            people: ['robynwoods', 'johnmcneil'],
            genomes: '2000',
            sequenced: '1700',
            logos: ['assets/logos/aspree.png', 'assets/logos/monash.png'],
            heights: [{'name': '30-40', 'x': 35, 'y': 0.0}, {'name': '40-50', 'x': 45, 'y': 0.0}, {
                'name': '50-60',
                'x': 55,
                'y': 0.0
            }, {'name': '60-70', 'x': 65, 'y': 0.0}, {'name': '70-80', 'x': 75, 'y': 0.0}, {
                'name': '80-90',
                'x': 85,
                'y': 0.0
            }, {'name': '90-100', 'x': 95, 'y': 0.0}, {'name': '100-110', 'x': 105, 'y': 0.0}, {
                'name': '110-120',
                'x': 115,
                'y': 0.0
            }, {'name': '120-130', 'x': 125, 'y': 0.0}, {'name': '130-140', 'x': 135, 'y': 1.0}, {
                'name': '140-150',
                'x': 145,
                'y': 78.0
            }, {'name': '150-160', 'x': 155, 'y': 624.0}, {'name': '160-170', 'x': 165, 'y': 717.0}, {
                'name': '170-180',
                'x': 175,
                'y': 477.0
            }, {'name': '180-190', 'x': 185, 'y': 99.0}, {'name': '190-200', 'x': 195, 'y': 2.0}, {
                'name': '200-210',
                'x': 205,
                'y': 0.0
            }, {'name': '210-220', 'x': 215, 'y': 0.0}, {'name': '220-230', 'x': 225, 'y': 0.0}, {
                'name': '230-240',
                'x': 235,
                'y': 0.0
            }, {'name': '240-250', 'x': 245, 'y': NaN}],
            weights: [{'name': '0-30', 'x': 0, 'y': 0}, {'name': '30-40', 'x': 35, 'y': 4.0}, {
                'name': '40-50',
                'x': 45,
                'y': 46.0
            }, {'name': '50-60', 'x': 55, 'y': 245.0}, {'name': '60-70', 'x': 65, 'y': 472.0}, {
                'name': '70-80',
                'x': 75,
                'y': 580.0
            }, {'name': '80-90', 'x': 85, 'y': 394.0}, {'name': '90-100', 'x': 95, 'y': 187.0}, {
                'name': '100-110',
                'x': 105,
                'y': 42.0
            }, {'name': '110-200', 'x': 195, 'y': 0}],
            ages: [{'name': '0-5', 'x': 2.5, 'y': 0.0}, {'name': '5-10', 'x': 7.5, 'y': 0.0}, {
                'name': '10-15',
                'x': 12.5,
                'y': 0.0
            }, {'name': '15-20', 'x': 17.5, 'y': 0.0}, {'name': '20-25', 'x': 22.5, 'y': 0.0}, {
                'name': '25-30',
                'x': 27.5,
                'y': 0.0
            }, {'name': '30-35', 'x': 32.5, 'y': 0.0}, {'name': '35-40', 'x': 37.5, 'y': 0.0}, {
                'name': '40-45',
                'x': 42.5,
                'y': 0.0
            }, {'name': '45-50', 'x': 47.5, 'y': 0.0}, {'name': '50-55', 'x': 52.5, 'y': 0.0}, {
                'name': '55-60',
                'x': 57.5,
                'y': 0.0
            }, {'name': '60-65', 'x': 62.5, 'y': 0.0}, {'name': '65-70', 'x': 67.5, 'y': 0.0}, {
                'name': '70-75',
                'x': 72.5,
                'y': 0.0
            }, {'name': '75-80', 'x': 77.5, 'y': 239.0}, {'name': '80-85', 'x': 82.5, 'y': 1110.0}, {
                'name': '85-90',
                'x': 87.5,
                'y': 508.0
            }, {'name': '90-95', 'x': 92.5, 'y': 132.0}, {'name': '95-100', 'x': 97.5, 'y': 11.0}, {
                'name': '100-105',
                'x': 102.5,
                'y': 0.0
            }, {'name': '105-110', 'x': 107.5, 'y': NaN}],
            sex: [{'name': 'Female', y: 1135}, {'name': 'Male', y: 865}]
        }
    ],
    [
        'over45',
        {
            id: 'over45',
            link: 'https://www.saxinstitute.org.au/our-work/45-up-study/',
            title: 'The 45 and Up Study',
            summary: '',
            tags: ['healthy', 'disease free'],
            people: ['margobarr', 'robertwells'],
            genomes: '2000',
            sequenced: '0',
            logos: ['assets/logos/sax_45.png'],
            heights: [{'name': '30-40', 'x': 35, 'y': 0.0}, {'name': '40-50', 'x': 45, 'y': 0.0}, {
                'name': '50-60',
                'x': 55,
                'y': 0.0
            }, {'name': '60-70', 'x': 65, 'y': 1.0}, {'name': '70-80', 'x': 75, 'y': 3.0}, {
                'name': '80-90',
                'x': 85,
                'y': 1.0
            }, {'name': '90-100', 'x': 95, 'y': 0.0}, {'name': '100-110', 'x': 105, 'y': 1.0}, {
                'name': '110-120',
                'x': 115,
                'y': 0.0
            }, {'name': '120-130', 'x': 125, 'y': 1.0}, {'name': '130-140', 'x': 135, 'y': 2.0}, {
                'name': '140-150',
                'x': 145,
                'y': 17.0
            }, {'name': '150-160', 'x': 155, 'y': 203.0}, {'name': '160-170', 'x': 165, 'y': 383.0}, {
                'name': '170-180',
                'x': 175,
                'y': 300.0
            }, {'name': '180-190', 'x': 185, 'y': 154.0}, {'name': '190-200', 'x': 195, 'y': 7.0}, {
                'name': '200-210',
                'x': 205,
                'y': 0.0
            }, {'name': '210-220', 'x': 215, 'y': 0.0}, {'name': '220-230', 'x': 225, 'y': 1.0}, {
                'name': '230-240',
                'x': 235,
                'y': 0.0
            }, {'name': '240-250', 'x': 245, 'y': NaN}],
            weights: [{'name': '0-30', 'x': 0, 'y': 0}, {'name': '30-40', 'x': 35, 'y': 1.0}, {
                'name': '40-50',
                'x': 45,
                'y': 19.0
            }, {'name': '50-60', 'x': 55, 'y': 133.0}, {'name': '60-70', 'x': 65, 'y': 275.0}, {
                'name': '70-80',
                'x': 75,
                'y': 291.0
            }, {'name': '80-90', 'x': 85, 'y': 202.0}, {'name': '90-100', 'x': 95, 'y': 109.0}, {
                'name': '100-110',
                'x': 105,
                'y': 36.0
            }, {'name': '110-120', 'x': 115, 'y': 17.0}, {'name': '120-130', 'x': 125, 'y': 6.0}, {
                'name': '130-140',
                'x': 135,
                'y': 1.0
            }, {'name': '140-150', 'x': 145, 'y': 1.0}, {'name': '150-160', 'x': 155, 'y': 1.0}, {
                'name': '160-170',
                'x': 165,
                'y': 0.0
            }, {'name': '170-180', 'x': 175, 'y': 1.0}, {'name': '180-190', 'x': 185, 'y': 1.0}, {
                'name': '190-200',
                'x': 195,
                'y': 0
            }],
            ages: [{'name': '0-5', 'x': 2.5, 'y': 0.0}, {'name': '5-10', 'x': 7.5, 'y': 0.0}, {
                'name': '10-15',
                'x': 12.5,
                'y': 0.0
            }, {'name': '15-20', 'x': 17.5, 'y': 0.0}, {'name': '20-25', 'x': 22.5, 'y': 0.0}, {
                'name': '25-30',
                'x': 27.5,
                'y': 0.0
            }, {'name': '30-35', 'x': 32.5, 'y': 0.0}, {'name': '35-40', 'x': 37.5, 'y': 0.0}, {
                'name': '40-45',
                'x': 42.5,
                'y': 0.0
            }, {'name': '45-50', 'x': 47.5, 'y': 0.0}, {'name': '50-55', 'x': 52.5, 'y': 0.0}, {
                'name': '55-60',
                'x': 57.5,
                'y': 0.0
            }, {'name': '60-65', 'x': 62.5, 'y': 0.0}, {'name': '65-70', 'x': 67.5, 'y': 0.0}, {
                'name': '70-75',
                'x': 72.5,
                'y': 424.0
            }, {'name': '75-80', 'x': 77.5, 'y': 329.0}, {'name': '80-85', 'x': 82.5, 'y': 183.0}, {
                'name': '85-90',
                'x': 87.5,
                'y': 128.0
            }, {'name': '90-95', 'x': 92.5, 'y': 56.0}, {'name': '95-100', 'x': 97.5, 'y': 3.0}, {
                'name': '100-105',
                'x': 102.5,
                'y': 0.0
            }, {'name': '105-110', 'x': 107.5, 'y': NaN}],
            sex: [{'name': 'Female', y: 636}, {'name': 'Male', y: 487}]
        }
    ],
    [
        'schizophrenia',
        {
            id: 'schizophrenia',
            link: '',
            title: 'Schizophrenia',
            summary: '',
            tags: ['schizophrenia', '2015'],
            people: ['murraycairns'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/una.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'retinal',
        {
            id: 'retinal',
            link: '',
            title: ' Blinding Retinal Dystrophy',
            summary: '',
            tags: ['2016'],
            people: [],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/usyd.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'melanoma',
        {
            id: 'melanoma',
            link: '',
            title: 'Metastatic Melanoma',
            summary: '',
            tags: ['Melanoma', '2015'],
            people: ['grahammann'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/westmead.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'mitochondrial',
        {
            id: 'mitochondrial',
            link: '',
            title: 'Mitochondrial Disease',
            summary: '',
            tags: ['Mitochondrial', '2015'],
            people: ['carolynsue'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/kolling.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'congenital',
        {
            id: 'congenital',
            link: '',
            title: 'Congenital Heart Disease',
            summary: '',
            tags: ['Mitochondrial', '2015'],
            people: ['sallydunwoodie'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/victorchang.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'mendelian_disorders',
        {
            id: 'mendelian_disorders',
            link: '',
            title: 'Mendelian Disorders',
            summary: '',
            tags: ['2016'],
            people: ['tonros'],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/garvan-logo-sml.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        },
    ],
    [
        'rare_disease',
        {
            id: 'rare_disease',
            link: '',
            title: 'Rare Disease',
            summary: '',
            tags: ['2016'],
            people: ['tonros'],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/garvan-logo-sml.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        },
    ],
    [
        'epilepsy',
        {
            id: 'epilepsy',
            link: '',
            title: 'Epilepsy',
            summary: '',
            tags: ['2016'],
            people: ['tonros'],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/garvan-logo-sml.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'bone',
        {
            id: 'bone',
            link: '',
            title: 'Genetic Disorders of Bone',
            summary: '',
            tags: ['2016'],
            people: [''],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/schn.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'cardiomyopathies',
        {
            id: 'cardiomyopathies',
            link: '',
            title: 'Inherited Cardiomyopathies',
            summary: '',
            tags: ['2016'],
            people: [''],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/usyd.png', 'assets/logos/cilr.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'most',
        {
            id: 'most',
            link: '',
            title: 'MoST',
            summary: '',
            tags: [],
            people: ['johnsimes', 'davidthomas', 'dominiquehess'],
            genomes: '1000',
            sequenced: '0',
            logos: ['assets/logos/nhmrc.png', 'assets/logos/usyd.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'crs',
        {
            id: 'crs',
            link: '',
            title: 'Cancer Risk Study',
            summary: '',
            tags: [],
            people: ['davidthomas', 'johnsimes', 'dominiquehess'],
            genomes: '1000',
            sequenced: '0',
            logos: ['assets/logos/lifehouse.png', 'assets/logos/garvan-logo-sml.png', 'assets/logos/svhs.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
]);

const NEW_COHORTS = new Array<any>(
    {
        title: 'Mitochondria',
        content: [
            {
                header: "Methodology", 
                text: "A parallel evaluation of genomic testing methodologies in mitochondrial diseases."
            },
            {
                header: "Cohort", 
                text: "Paediatric and Adult"
            },
            {
                header: "Sequencing strategy", 
                text: "Half whole genome sequencing (WGS), half whole exome sequencing (WES) with mtDNA."
            },
            {
                header: "Recruitment", 
                text: "210"
            },
            {
                header: "Standard of Care",
                text: "A range of biochemical, enzyme and histology assays, often requiring biopsy. MRI/MRS and small / single gene tests may be used."
            },
            {
                header: "Evaluation", 
                text: "Diagnostic utility and cost effectiveness of WGS vs WES+mtDNA sequencing; participant surveys."
            },
            {
                header: "Research linkages", 
                text: "Undiagnosed patients will reflex to research programs at Murdoch Children’s."
            },
            {
                header: "Collaborations", 
                text: "This Flagship is a collaboration with the Australian Mitochondrial Disease Foundation, who fund 50% of the sequencing. An animation to support the consent process has been developed by Dr Cathy Quinlan, and is available to recruited patients (see: www.australiangenomics.org.au/mito)"
            },
        ],
        authors: ['John Christodoulou', 'David Thorburn', 'Joy Lee', 'Nick Smith', 'David Coman', 'Maina Kava', 'Michael Fahey', 'Carolyn Ellaway', 'Janice Fletcher', 'Phillipa Lamont', 'Mike Ryan', 'Maie Walsh', 'Alexandra Filipovska'],
        imgSource: 'assets/mito-logo.png'
    },
    {
        title: 'Neuromuscular',
        content: [
            {
                header: "Methodology", 
                text: "The goal of this project is to 1) to trial the next layers of diagnostic genomics above standard care, 2) to test whether optimise referral and data collection processes enriches diagnostic yield, 3) to perform health economic evaluation of neuromuscular disorders."
            },
            {
                header: "Cohort", 
                text: "Paediatric and Adult"
            },
            {
                header: "Sequencing strategy", 
                text: "WGS (Genome.One), RNAseq (Pathwest)"
            },
            {
                header: "Recruitment", 
                text: "300"
            },
            {
                header: "Standard of Care",
                text: "The PathWest NATA-accredited capture panels have been SOC since prior to Australian Genomics, except in South Australia, which is now using, through SAPath, a targeted panel of ≈1200 commonly requested genes or Medical Exome."
            },
            {
                header: "Evaluation", 
                text: "Is there improved diagnostic utility through the next layers of genomic testing, optimal clinical data collection and appropriate referring pathways? Data obtained through participant surveys on NMD costs."
            },
            {
                header: "Research linkages", 
                text: "The Neuromuscular Disorders Flagship links to well established research collaboratives, including the Australasian Neuromuscular Network, and links with Daniel MacArthur’s Group at the Broad Institute, USA."
            },
            {
                header: "Collaborations", 
                text: "The EU FP7 NeurOmics network."
            },
        ],
        authors: ['Nigel Laing', 'Phillipa Lamont', 'Kristi Jones', 'Denise Howting', 'Mark Davis', 'Phillipa Lamont', 'Chris Barnett', 'Anita Cairns', 'David Mowat', 'Suzanna Thompson', 'Roula Ghaoui', 'Sandra Cooper', 'Kristen Nowak', 'Gina Ravenscroft'],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Neurodevelopmental Disabilities',
        content: [
            {
                header: "Methodology", 
                text: "There are three sub-projects to the Neurodevelopmental Disabilities Flagship: Epileptic Encephalopathies (EE), Brain Malformations and Leukodystrophies (BML) & Intellectual Disabilities (ID)."
            },
            {
                header: "Cohort", 
                text: "Paediatric"
            },
            {
                header: "Sequencing strategy", 
                text: "WES; some ID trios receiving WGS."
            },
            {
                header: "Recruitment", 
                text: "EE 105; BML 170; ID 50 trios."
            },
            {
                header: "Standard of Care",
                text: "varies state to state, but may include brain imaging (often requires anaesthesia), chromosomal microarray, range of biochemical tests, and potentially invasive procedures like biopsies."
            },
            {
                header: "Evaluation", 
                text: "Relative diagnostic utility and cost effectiveness of genomic sequencing over standard care and participant / health economic surveys."
            },
            {
                header: "Research linkages", 
                text: "There are well-established research programs associated with these studies – with Jozef Gecz (SA), Ingrid Scheffer (VIC), Rick Leventer & Paul Lockhart (VIC) & Cas Simons (VIC)."
            },
            {
                header: "Collaborations", 
                text: "Dr Cathy Quinlan’s consent animation has been adapted for the ID Flagship."
            },
        ],
        authors: ['Jozef Gecz', 'Ingrid Scheffer', 'Katherine Howell', 'Deepak Gill', 'Lakshmi Nagarajan', 'Stephen Malone', 'Clair Pridmore', 'Tyson Ware', 'Rick Leventer', 'Paul Lockhart', 'Kate Riney', 'Chris Barnett', 'Nick Smith', 'Jonathan Silberstein', 'Rani Sachdev', 'Shakeed Mohammed', 'Cas Simons', 'Tony Rascioli', 'Mike Field', 'David Armore', 'Gareth Baynam', 'Julie McGaughran'],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Kidgen Renal Genetics',
        content: [
            {
                header: "Methodology", 
                text: "A parallel evaluation of genomic testing methodologies in renal disease of suspected genetic origin."
            },
            {
                header: "Cohort", 
                text: "Paediatric and Adult."
            },
            {
                header: "Sequencing strategy", 
                text: "WES (VIC), large capture panels (NSW) or overseas testing (UK)."
            },
            {
                header: "Recruitment", 
                text: "360 with clinical audit of 100+ retrospective cases"
            },
            {
                header: "Standard of Care",
                text: "traditionally, diagnosis was clinical, based on pedigree, radiological and pathology results."
            },
            {
                header: "Evaluation", 
                text: "Diagnostic utility & cost effectiveness; participant surveys; evaluation of the multidisciplinary clinic approach; diagnostic impacts on avoidance of therapy/intervention, medical management and reproductive choice."
            },
            {
                header: "Research linkages", 
                text: "Undiagnosed patients or those with VUS will be offered recruitment into established pioneering program of work with iPSC at Murdoch Children’s."
            },
            {
                header: "Collaborations", 
                text: "This Flagship is a project of KidGen(www.kidgen.org.au), an Australian-based collaborative consortium focussed on providing a definitive diagnosis to patients with inherited forms of kidney disease. Dr Cathy Quinlan’s KidGen animation has been adapted to support other Australian Genomics Flagships. This Flagship is a collaboration with Melbourne Genomics."
            },
        ],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Genetic Immunology',
        content: [
            {
                header: "Methodology", 
                text: "The Genetic Immunology flagship will concentrate on immune deficiency, autoimmune and autoinflammatory diseases."
            },
            {
                header: "Cohort", 
                text: "Paediatric and Adult, 5 clinical subgroups (SCID, combined immune deficiency, HLH, autoinflammatory disease, autoimmunity)."
            },
            {
                header: "Sequencing strategy", 
                text: "WES & WGS."
            },
            {
                header: "Recruitment", 
                text: "50 – 100 index cases"
            },
            {
                header: "Standard of Care",
                text: "for most of the selected cohorts, genetic testing is not currently available."
            },
            {
                header: "Evaluation", 
                text: "Resolution of cases by WES/WGS that remain undiagnosed after routine investigations; health economic analysis based on time to diagnosis, cost of delayed diagnosis and additional investigations, & delay to implementation of therapy."
            },
            {
                header: "Research linkages", 
                text: "Centre for Personalised Immunology."
            },
            {
                header: "Collaborations", 
                text: "Linking to established collaborative immunology projects at the Garvan & Melbourne Genomics."
            },
        ],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Childranz',
        content: [
            {
                header: "Methodology", 
                text: "Establishing evidence that genomics improves the value of healthcare by increasing the diagnostic yield, impacting the change of management and outcomes, and reducing costs in children with interstitial and diffuse lung diseases."
            },
            {
                header: "Cohort", 
                text: "Paediatric"
            },
            {
                header: "Sequencing strategy", 
                text: "WES"
            },
            {
                header: "Recruitment", 
                text: "210"
            },
            {
                header: "Standard of Care",
                text: "There is currently no national standardised approach to genomic testing; this will be addressed by this flagship which will enable the development of NGS as a standard of care."
            },
            {
                header: "Evaluation", 
                text: "Standardise management and standards of practice in Australia, establish a chILD registry and provide an opportunity to participate in an international clinical trial."
            },
            {
                header: "Research linkages", 
                text: "Centre for Personalised Immunology."
            },
            {
                header: "Collaborations", 
                text: "Linking to established collaborative immunology projects at the Garvan & Melbourne Genomics."
            },
        ],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Cardiovascular Disorders',
        content: [
            {
                header: "Methodology", 
                text: "Undertaking genomic testing in patients with inherited cardiomyopathies, primary arrhythmia disorders or congenital heart disease."
            },
            {
                header: "Cohort", 
                text: "Paediatric and Adult"
            },
            {
                header: "Sequencing strategy", 
                text: "WES, WGS & Panels"
            },
            {
                header: "Recruitment", 
                text: "400"
            },
            {
                header: "Standard of Care",
                text: "Specialised multidisciplinary evaluation and deep phenotyping; access to genomic investigation is variable, and often restricted to the research domain."
            },
            {
                header: "Evaluation", 
                text: "Determine the current state of play of cardiac genetic testing in Australia, and establish the optimisation and translation of genomic approaches in families with genetic heart disease."
            },
            {
                header: "Research linkages", 
                text: "Functional genomics networks at VCCRI, IMB & the Australian Functional Genomics network."
            },
            {
                header: "Collaborations", 
                text: "engages with a broad established collaborative network Australian Genetic Heart Disease Registry & Australian Cardiac Genetic Testing Network."
            },
        ],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Acute Care Genomic Testing',
        content: [
            {
                header: "Methodology", 
                text: "Provide ultra-rapid (<5 day) genomic testing to acutely unwell infants and children with suspected genetic conditions, with the aim of providing diagnostic certainty and guiding acute care management."
            },
            {
                header: "Cohort", 
                text: "Paediatric"
            },
            {
                header: "Sequencing strategy", 
                text: "Ultra rapid trio WES & WGS"
            },
            {
                header: "Recruitment", 
                text: "250"
            },
            {
                header: "Standard of Care",
                text: "Acute care patients with suspected genetic disorders are referred for tiered genetic testing, & sequencing has an average return of results in 3-6 months."
            },
            {
                header: "Evaluation", 
                text: "In this cohort, rapid/ultra-rapid genomic sequencing is postulated to substantially altering the diagnostic pathway and impacting on acute management, reducing morbidity, mortality & length of ICU stay (~$4500/day)."
            },
            {
                header: "Collaborations", 
                text: "Stephen Kingsmore at the Rady Children’s, & similar international rapid genomic sequencing initiatives"
            },
        ],
        imgSource: 'assets/cooming-soon.png'
    },
    {
        title: 'Hidden Renal Genetics',
        content: [
            {
                header: "Methodology", 
                text: "The HIDDEN Flagship seeks to identify whether clinical genomic sequencing has a diagnostic and/or management role amongst patients with End Stage Kidney Disease (ESKD) of unknown cause."
            },
            {
                header: "Cohort", 
                text: "Paediatric and Adult"
            },
            {
                header: "Sequencing strategy", 
                text: "WGS"
            },
            {
                header: "Recruitment", 
                text: "200"
            },
            {
                header: "Standard of Care",
                text: "For patients without any clear clinical or other indication as to their primary renal diagnosis, the SOC is that an “Uncertain Diagnosis” is coded and listed. There is no current subspecialty, genetic or genomic referral pathway for such patients."
            },
            {
                header: "Evaluation", 
                text: "SOC vs. WGS for young patients (<50yrs) with end stage kidney disease (ESKD) of unknown cause: diagnostic yield, cost effectiveness and patient outcomes."
            },
            {
                header: "Research linkages", 
                text: "Undiagnosed patients or those with VUS will be offered recruitment into established genomic and functional research programs of KidGen."
            },
            {
                header: "Collaborations", 
                text: "This Flagship is a project of the KidGen Collaborative (www.kidgen.org.au)."
            },
        ],
        imgSource: 'assets/cooming-soon.png'
    }
)

@Injectable()
export class CohortService {

    getCohorts(): Promise<Map<string, Cohort>> {
        return Promise.resolve(COHORTS);
    };

    getNewCohorts(): Array<any> {
        return NEW_COHORTS;
    };

    getCohort(id: string): Promise<Cohort> {
        return this.getCohorts()
            .then(cohorts => cohorts.get(id));
    }
}
