import { InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "../ui/popover";

interface InfoPopoverProps {
    title: string;
}

export const InfoPopover = ({ title }: InfoPopoverProps) => {

    const getDescription = () => {
        
        const longestSpillDescription = "We show how long the spill lasted from when it began to the last time the monitoring system reported an update. This reflects the recorded duration, not the current live status.";
        
        switch (title) {
            case "longest_active_spill":
                return {
                    title: "How We Measure This Duration",
                    description: longestSpillDescription,
                }
            default:
                return "";
        }
    }

    const content = getDescription();
    if (!content) return null;

    return (
        <Popover>
            <PopoverTrigger>
                <InfoIcon className="w-4 h-4 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="space-y-2">
                <PopoverTitle>{content.title}</PopoverTitle>
                <p>{content.description}</p>
            </PopoverContent>
        </Popover>
    );
};